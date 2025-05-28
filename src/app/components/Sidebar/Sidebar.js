import './Sidebar.css';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className="sidebar">
                    <ul className="menu-list">
                        <li className="menu-item"><Link href="/financeiro/pageUser"> Início</Link></li>
                        <hr />
                        <li className="menu-item">Transferências</li>
                        <hr />
                        <li className="menu-item"><Link href="/financeiro/investimentos">Investimentos</Link></li>
                        <hr />
                        <li className="menu-item"><Link href="/financeiro/servicos">Outros serviços</Link></li>
                    </ul>
                </div>
    );

}