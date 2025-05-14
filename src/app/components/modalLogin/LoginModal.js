import React, { useEffect, useRef, useState } from 'react';
import './LoginModal.css'; 
import Image from 'next/image'; 

const LoginModal = ({ onClose }) => {
    const modalRef = useRef(null); 
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true); // Abre o modal suavemente

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsOpen(false); // Fecha o modal
                onClose(); // Chama a função de fechamento passada como prop
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className={`modal-content ${isOpen ? 'open' : ''}`} ref={modalRef}>
                <button className="close-button" onClick={() => { setIsOpen(false); onClose(); }}>×</button>
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