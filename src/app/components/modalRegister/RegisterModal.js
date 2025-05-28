import React, { useEffect, useRef, useState } from "react";
import "./RegisterModal.css";
import Image from "next/image";
import { createAccount, createUser }  from "../../financeiro/util-services";

const RegisterModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    terms: false,
    id: 0,
    dataCriacao: new Date(),
  });

  useEffect(() => {
    setIsOpen(true);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChangeFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAccount = async () => {
    const novaContaUsuario = {
        userName: formData.userName,
        id: formData.id,
        dataCriacao: formData.dataCriacao,
        saldo: 0,
        extrato: [],
      };

      const response = await createAccount(novaContaUsuario);

      if(response.ok) {
        console.log("Conta criada com sucesso!");
      }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const responseUsers = await getUsers();

    if (responseUsers.ok) {
      const usuarios = await responseUsers.json();

      const idUsuario =
        usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
      formData.id = idUsuario;
    }

    const response = await createUser(formData);

    if (response.ok) {
      handleAccount();
      alert("Usuário cadastrado com sucesso!");
      setFormData({});
      onClose();
    } else {
      alert("Erro ao cadastrar usuário!");
      setFormData({});
    }
  };
  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div
        className={`modal-content modal-register ${isOpen ? "open" : ""}`}
        ref={modalRef}
      >
        <div className="register-container">
          <button
            className="close-button"
            onClick={() => {
              setIsOpen(false);
              onClose();
            }}
          >
            ×
          </button>
          <Image
            className="imgRegister"
            src="/image_register.png"
            alt="Imagem de cadastro"
            width={333}
            height={267}
          />
          <h3>Preencha os campos abaixo para criar sua conta corrente!</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-register">
              <p className="name-register">Nome</p>
              <div className="form-group">
                <input
                  className="input-name-register"
                  type="text"
                  id="nome"
                  name="userName"
                  placeholder="Digite seu nome"
                  value={formData.userName}
                  onChange={handleChangeFormData}
                  required
                />
              </div>
              <p className="email-register">Email</p>
              <div className="form-group">
                <input
                  className="input-email-register"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="Digite seu email"
                  onChange={handleChangeFormData}
                  required
                />
              </div>
              <p className="password-register">Senha</p>
              <div className="form-group">
                <input
                  className="input-password-register"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="Digite sua senha"
                  onChange={handleChangeFormData}
                  required
                />
              </div>
              <div className="form-group group-checkbox">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  className="input-checkbox-register"
                  id="terms"
                  onChange={(e) =>
                    setFormData({ ...formData, terms: e.target.checked })
                  }
                  required
                />
                <label htmlFor="terms">
                  Li e estou ciente quanto às condições de tratamento dos meus
                  dados conforme descrito na Política de Privacidade do banco
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="submit-button-register"
              disabled={!formData.terms}
            >
              Criar conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
