import React, { useEffect, useRef, useState } from "react";
import "./LoginModal.css";
import Image from "next/image";
import { redirect } from 'next/navigation'


const LoginModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsOpen(true); // Abre o modal suavemente

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false); // Fecha o modal
        onClose(); // Chama a função de fechamento passada como prop
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/usuarios");

    if (response.ok) {
      const usuarios = await response.json();

      const usuario = usuarios.filter(
        (usuario) =>
          usuario.email == event.target.email.value &&
          usuario.password == event.target.password.value
      );

      if (usuario.length > 0) {
        alert("Login realizado com sucesso!");
        setIsOpen(false);
        onClose();
        redirect(`/financeiro/pageUser/id=${usuario[0].id}`);
      } else {
        alert("Erro verifique usuário e senha");
      }
    } else {
      alert("Erro ao conectar com servidor");
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className={`modal-content ${isOpen ? "open" : ""}`} ref={modalRef}>
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
          className="imgLogin"
          src="/icone_login.png"
          alt="imagem login"
          width={333}
          height={267}
        />
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <p className="email">Email</p>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChangeFormData}
              required
            />
          </div>
          <p className="senha">Senha</p>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChangeFormData}
              required
            />
          </div>
          <p className="forgot-password">
            <a href="#">Esqueci a senha!</a>
          </p>
          <button type="submit" className="submit-button">
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
