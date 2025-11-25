import './App.css'
import React from 'react';


function MenuRestaurante() {
    const pratos = [
        { nome: 'lasanha bolonhesa', preco: 32.90, descricao: 'massa fresca com molho cru' },
        { nome: 'salmão grelhado', preco: 45.60, descricao: 'filé de salmão com legumes fritos' },
        { nome: 'pizza margherita', preco: 80.00, descricao: 'massa artesanal com molho de tomate' },
        { nome: 'macarrão ao molho branco', preco: 35.50, descricao: 'massa fina com molho de queijo' }
    ];
    return (
        <div>
            <h1>Cardápio do Restaurante</h1>
            <div className="menu-grid">
                {pratos.map((prato, index) => (
                    <div key={index} className="prato-card">
                        <h3>{prato.nome}</h3>
                        <p className="preco">R$ {prato.preco.toFixed(2)}</p>
                        <p className="descricao">{prato.descricao}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default MenuRestaurante