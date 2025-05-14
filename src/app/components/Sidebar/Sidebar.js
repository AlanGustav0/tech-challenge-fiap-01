import './Sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
                    <ul className="menu-list">
                        <li className="menu-item">Início</li>
                        <hr />
                        <li className="menu-item">Transferências</li>
                        <hr />
                        <li className="menu-item">Investimentos</li>
                        <hr />
                        <li className="menu-item">Outros serviços</li>
                    </ul>
                </div>
    );

}