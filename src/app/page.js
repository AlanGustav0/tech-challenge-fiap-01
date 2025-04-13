import Image from 'next/image';

export default function HomePage() {
    return (
        <div className="container">
           <header className="header">
    <Image src="/icone_logo.png" alt="Bytebank" width={150} height={40} />
    <nav className="nav-links">
        <a href="#" className="nav-link">Sobre</a> 
        <a href="#" className="nav-link">Serviços</a>
    </nav>
    <div className="button-container">
        <button className="button">Abrir minha conta</button>
        <button className="button secondary">Já tenho conta</button>
    </div>
</header>
            <main className="main">
              <div className='bloco-centra'>
              <h2>
                    Experimente mais liberdade no controle da sua vida financeira.
                    Crie sua conta com a gente!
                </h2>
      
                <div className="ilustracao">
                    <Image
                        src="/icone_ilustracao_banner.png"
                        alt="Ilustração"
                        width={600}
                        height={400}
                  
                    />
                </div>
                
              </div>
              <h2 className='vantagemBanco'>Vantagens do nosso banco:</h2>
                <section className="advantages">
                    <div className="advantage">
                        <Image
                            src="/icone_presente.png"
                            alt="Conta e cartão gratuitos"
                            width={50}
                            height={50}
                        />
                        <h3 className='tituloContaCartao'>Conta e cartão gratuitos</h3>
                        <p>
                            Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.
                        </p>
                    </div>
                
                    <div className="advantage">
                        <Image
                            src="/icone_saque.png"
                            alt="Saques sem custo"
                            width={50}
                            height={50}
                        />
                        <h3>Saques sem custo</h3>
                        <p>
                            Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.
                        </p>
                    </div>
                    <div className="advantage">
                        <Image
                            src="/icone_estrela.png"
                            alt="Programa de pontos"
                            width={50}
                            height={50}
                        />
                        <h3>Programa de pontos</h3>
                        <p>
                            Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!
                        </p>
                    </div>
                    <div className="advantage">
                        <Image
                            src="/icone_dispositivo.png"
                            alt="Seguro Dispositivos"
                            width={50}
                            height={50}
                        />
                        <h3>Seguro Dispositivos</h3>
                        <p>
                            Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.
                        </p>
                    </div>
                </section>
            </main>
            <footer className="footer">
    <div className="services">
        <h4>Serviços</h4>
        <p>Conta corrente</p>
        <p>Conta PJ</p>
        <p>Cartão de crédito</p>
    </div>
    <div className="contact">
        <h4>Contato</h4>
        <p>0800 004 250 08</p>
        <p>meajuda@bytebank.com.br</p>
        <p>ouvidoria@bytebank.com.br</p>
    </div>
    <div className="footer-logo">
        <h4>Desenvolvido por Alura</h4>
        <img src="icone_logo_rodape.png" alt="Logo do Bytebank" />
        <div className="social-icons">
            <img src="icone_redes_sociais.png" alt="Ícones de redes sociais" />
        </div>
    </div>
</footer>
        </div>
    );
    }