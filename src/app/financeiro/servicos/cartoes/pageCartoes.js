'use client';
import Image from 'next/image';
import './pageCartoes.css';

const PageCartoesComponent = () => {
  return (
    <div className="container-cartoes" >
        <h2 className="titulo-secao">Meus cartões</h2>
        <section className="cartao-section">
            <h3>Cartão físico</h3>
            <div className="cartao">
            <Image src="/cartao_fisico.png" alt="Cartão físico" width={327} height={164} />
            <div className="acoes-cartao">
                <button className="botao-configurar">Configurar</button>
                <button className="botao-bloquear">Bloquear</button>
                <span className="funcao-cartao">Função: Débito/Crédito</span>
            </div>
            </div>
        </section>

        <section className="cartao-section">
            <h3>Cartão digital</h3>
            <div className="cartao">
            <Image src="/cartao_digital.png" alt="Cartão digital" width={327} height={164} />
            <div className="acoes-cartao">
                <button className="botao-configurar">Configurar</button>
                <button className="botao-bloquear">Bloquear</button>
                <span className="funcao-cartao">Função: Débito</span>
            </div>
            </div>
        </section>
    </div>
  );
}

export default PageCartoesComponent;