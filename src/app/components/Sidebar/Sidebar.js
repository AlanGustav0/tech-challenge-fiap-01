import './Sidebar.css';
import Link from 'next/link';

export default function Sidebar(userid) {
    return (
        <div className="sidebar">
                    <ul className="menu-list">
                        <li className="menu-item"><Link href={`/financeiro/pageUser/id=${userid.id}`}> Início</Link></li>
                        <hr />
                        <li className="menu-item">Transferências</li>
                        <hr />
                        <li className="menu-item"><Link href={`/financeiro/investimentos/id=${userid.id}`}>Investimentos</Link></li>
                        <hr />
                        <li className="menu-item"><Link href={`/financeiro/servicos/id=${userid.id}`}>Outros serviços</Link></li>
                    </ul>
                </div>
    );

}