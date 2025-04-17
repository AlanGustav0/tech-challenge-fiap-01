import React, { useEffect, useRef, useState } from "react";
import "./RegisterModal.css";
import Image from "next/image";

const RegisterModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className={`modal-content ${isOpen ? "open" : ""}`} ref={modalRef}>
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
            className="imgLogin"
            src="/image_register.png"
            alt="imagem login"
            width={333}
            height={267}
          />
          <h3>Preencha os campos abaixo para criar sua conta corrente!</h3>
          <form>
            <div className="form-register">
              <p className="name-register">Nome</p>
              <div className="form-group">
                <input
                  type="text"
                  id="nome"
                  placeholder="Digite seu nome"
                  required
                />
              </div>
              <p className="email-register">Email</p>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <p className="password-register">Senha</p>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <div className="form-group group-checkbox">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  Li e estou ciente quanto às condições de tratamento dos meus
                  dados conforme descrito na Política de Privacidade do banco
                </label>
              </div>
            </div>
            <button type="submit" className="submit-button-register">
              Criar conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
