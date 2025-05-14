import './ExtratoCard.css'; // Estilos

export default function ExtratoCard() {
    return (
        <div className="extrato-card">
                        <div className='headerExtrato'>
                            <h2>Extrato</h2>
                            <button className='botaoEditar'></button>
                            <button className='botaoExcluir'></button>
                        </div>
                        
                        <div className="extrato-item">
                            <div className='mesExtrato'>
                                <span>Novembro</span>
                                <input type="checkbox" />
                            </div>
                            <div className='depositoExtrato'>
                                <span>Depósito</span>
                                <span className='dataExtrato'>20/11/2035</span>
                            </div>                     
                            <span className='valorExtrato'>R$ 150</span>

                            <div className='mesExtrato'>
                                <span>Dezembro</span>
                                <input type="checkbox" />
                            </div>

                            <div className='depositoExtrato'>
                                <span>Depósito</span>
                                <span className='dataExtrato'>20/11/2035</span>
                            </div>                     
                            <span className='valorExtrato'>R$ 150</span>
                        </div>
                    </div>
    )
}