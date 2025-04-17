import React, { useEffect, useRef } from 'react';
import './LoginModal.css'; 
import Image from 'next/image'; 

const LoginModal = ({ onClose }) => {
    const modalRef = useRef(null); // Referência para o modal

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // Fecha o modal se o clique foi fora dele
        }
    };

    useEffect(() => {
        // Adiciona o event listener para cliques fora do modal
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            // Remove o event listener ao desmontar o componente
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-content" ref={modalRef}>
                <button className="close-button" onClick={onClose}>×</button>
                <Image className='imgLogin' src="/icone_login.png" alt="imagem login" width={333} height={267} />
                <h2>Login</h2>
                <form>
                    <p className='email'>Email</p>
                    <div className="form-group">
                        <input type="email" id="email" placeholder="Digite seu email" required />
                    </div>
                    <p className='senha'>Senha</p>
                    <div className="form-group">
                        <input type="password" id="password" placeholder="Digite sua senha" required />
                    </div>
                    <p className="forgot-password">
                        <a href="#">Esqueci a senha!</a>
                    </p>
                    <button type="submit" className="submit-button">Acessar</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;