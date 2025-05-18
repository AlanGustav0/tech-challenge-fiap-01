import "./services.css";
import Image from "next/image";
import Link from "next/link";

const Services = () => {
  return (
    <div className="services-container">
      <h2 className="titulo-servicos">Confira os serviços disponíveis</h2>
      <section className="card-services">
        <div className="card">
          <Image
            src="/icone_emprestimo.png"
            alt="Ícone Empréstimo"
            width={60}
            height={60}
          />
          <p>Empréstimo</p>
        </div>
        <div className="card">
          <Image
            src="/icone_cartao.png"
            alt="Ícone Cartão"
            width={60}
            height={60}
          />
          <Link href="/financeiro/servicos/cartoes">
            <p>Meus Cartões</p>
          </Link>
        </div>
        <div className="card">
          <Image
            src="/icone_doacao.png"
            alt="Ícone Doação"
            width={60}
            height={60}
          />
          <p>Doações</p>
        </div>
        <div className="card">
          <Image src="/icone_pix.png" alt="Ícone Pix" width={60} height={60} />
          <p>Pix</p>
        </div>
        <div className="card">
          <Image
            src="/icone_seguros.png"
            alt="Ícone Seguros"
            width={60}
            height={60}
          />
          <p>Seguros</p>
        </div>
        <div className="card">
          <Image
            src="/icone_credito.png"
            alt="Ícone Crédito"
            width={60}
            height={60}
          />
          <p>Crédito Celular</p>
        </div>
      </section>
    </div>
  );
};

export default Services;
