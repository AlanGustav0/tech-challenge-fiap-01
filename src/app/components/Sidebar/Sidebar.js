'use client';

import './Sidebar.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const user = useSelector((state) => state.user);
    return (
        <div className="sidebar">
                    <ul className="menu-list">
                        <li className="menu-item"><Link href={`/financeiro/pageUser/id=${user.id}`}> Início</Link></li>
                        <hr />
                        <li className="menu-item">Transferências</li>
                        <hr />
                        <li className="menu-item"><Link href={`/financeiro/investimentos/id=${user.id}`}>Investimentos</Link></li>
                        <hr />
                        <li className="menu-item"><Link href={`/financeiro/servicos/id=${user.id}`}>Outros serviços</Link></li>
                    </ul>
                </div>
    );

}