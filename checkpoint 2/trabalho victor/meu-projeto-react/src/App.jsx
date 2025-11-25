import React, { useState, useEffect, useMemo } from 'react';

const ESTADO_INICIAL = {
    nome: "HERÓI SIMPLES",
    raca: "Humano",
    classe: "Guerreiro",
    nivel: 1,
    xpAtual: 0,
    xpProximoNivel: 300,
    pontosAtributos: 10,
    atributos: { forca: 1, resistencia: 1, inteligencia: 1, sorte: 1 },
    vidaAtual: 100,
    vidaMaxima: 100,
    manaAtual: 50,
    manaMaxima: 50,
    statusEfeitos: ["Saudável"],
    showEfeitos: false,
    ouro: 50,
    lojaAberta: false,
    itensLoja: [
        { id: 501, nome: "Poção Forte", custo: 40, tipo: "Consumível", cura: 20 },
    ],
    inventarioAberto: false,
    itens: [
        { id: 1, nome: "Espada", tipo: "Arma" },
        { id: 2, nome: "Poção", tipo: "Consumível", cura: 10, custo: 15 },
    ],
    missoesAtivas: [
        { id: 101, titulo: "Matar o Dragão", categoria: "Principal", completa: false },
    ],
    missoesCompletas: 0,
    palavraMagica: "",
    encantamentoGerado: "",
    party: [
        { nome: "Companheiro A", classe: "Mago", nivel: 1, xp: 150 },
        { nome: "Companheiro B", classe: "Arqueiro", nivel: 2, xp: 350 },
    ],
};


function RPGSimplesMinificado() {
    const [estado, setEstado] = useState(ESTADO_INICIAL);
    const [novaMissaoTitulo, setNovaMissaoTitulo] = useState('');
    const [novaMissaoCategoria, setNovaMissaoCategoria] = useState('Principal');
    

    const atualizarEstado = (novosValores) => {
        setEstado(prev => ({ ...prev, ...novosValores }));
    };
    
    const getCorVida = (vidaAtual, vidaMaxima) => {
        const percent = (vidaAtual / vidaMaxima) * 100;
        if (percent < 30) return 'red';
        if (percent <= 70) return 'yellow';
        return 'green';
    };

    useEffect(() => {
        if (estado.xpAtual >= estado.xpProximoNivel) {
            const novoNivel = estado.nivel + 1;
            console.log(`🎉 Nível ${novoNivel}!`);
            
            atualizarEstado({
                nivel: novoNivel,
                xpAtual: estado.xpAtual - estado.xpProximoNivel,
                xpProximoNivel: estado.xpProximoNivel + 150,
                pontosAtributos: estado.pontosAtributos + 1,
            });
        }
    }, [estado.xpAtual, estado.xpProximoNivel, estado.nivel]);

    const rankingOrdenado = useMemo(() => {
        const todosHerois = [
            { nome: estado.nome.toUpperCase() + " (VOCÊ)", nivel: estado.nivel, xp: estado.xpAtual, classe: estado.classe },
            ...estado.party
        ];
        
        return todosHerois.sort((a, b) => {
            if (b.nivel !== a.nivel) return b.nivel - a.nivel;
            return b.xp - a.xp;
        });
    }, [estado.nivel, estado.xpAtual, estado.party, estado.nome, estado.classe]);


    const sofrerDano = () => {
        atualizarEstado({ vidaAtual: Math.max(0, estado.vidaAtual - 15) });
    };

    const curar = () => {
        const indexPocao = estado.itens.findIndex(item => 
            item.nome.includes("Poção") && item.tipo === "Consumível"
        );

        if (indexPocao !== -1) {
            const itemPocao = estado.itens[indexPocao]; 
            const cura = itemPocao.cura || 10;
            
            const novosItens = [
                ...estado.itens.slice(0, indexPocao),
                ...estado.itens.slice(indexPocao + 1)
            ];

            atualizarEstado({ 
                vidaAtual: Math.min(estado.vidaMaxima, estado.vidaAtual + cura),
                itens: novosItens, 
            });
        } else {
            alert("Poção não encontrada!");
        }
    };

    const ganharXP = (xp) => atualizarEstado({ xpAtual: estado.xpAtual + xp });
    const derrotarInimigo = () => ganharXP(50);

    const toggleInventario = () => atualizarEstado({ inventarioAberto: !estado.inventarioAberto });

    const adicionarNovaMissao = () => {
        if (!novaMissaoTitulo.trim()) return;
        const novaMissao = { id: Date.now(), titulo: novaMissaoTitulo, categoria: novaMissaoCategoria, completa: false };
        atualizarEstado({ missoesAtivas: [...estado.missoesAtivas, novaMissao] });
        setNovaMissaoTitulo('');
    };

    const marcarMissaoConcluida = (id) => {
        const missoesFiltradas = estado.missoesAtivas.filter(m => m.id !== id);
        
        ganharXP(100);
        atualizarEstado({ 
            missoesAtivas: missoesFiltradas,
            missoesCompletas: estado.missoesCompletas + 1,
            ouro: estado.ouro + 25 
        });
    };
    
    const gerarEncantamento = () => {
        if (!estado.palavraMagica.trim()) return;
        const base = estado.palavraMagica.toUpperCase();
        const encantamento = `Recebeu o poder de ${base}`;
        
        atualizarEstado({ encantamentoGerado: encantamento });
    };

    const incrementarAtributo = (atributo) => {
        if (estado.pontosAtributos > 0) {
            const novoValor = estado.atributos[atributo] + 1;
            let novaVidaMaxima = estado.vidaMaxima;
            let novaManaMaxima = estado.manaMaxima;

            if (atributo === 'resistencia') novaVidaMaxima = 100 + (novoValor * 10);
            if (atributo === 'inteligencia') novaManaMaxima = 50 + (novoValor * 5);
            
            atualizarEstado({ 
                pontosAtributos: estado.pontosAtributos - 1,
                atributos: { ...estado.atributos, [atributo]: novoValor },
                vidaMaxima: novaVidaMaxima,
                manaMaxima: novaManaMaxima
            });
        }
    };
    
    const setNomePersonagem = (e) => {
        atualizarEstado({ nome: e.target.value.toUpperCase() });
    };
    const toggleEfeitos = () => atualizarEstado({ showEfeitos: !estado.showEfeitos });
    
    const toggleLoja = () => atualizarEstado({ lojaAberta: !estado.lojaAberta });

    const comprarItem = (item) => {
        if (estado.ouro >= item.custo) {
            const itemComprado = { ...item, id: Date.now() + Math.random() };
            atualizarEstado({ 
                ouro: estado.ouro - item.custo,
                itens: [...estado.itens, itemComprado]
            });
        } else {
            alert(`Ouro insuficiente! Necessário: ${item.custo}`);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.titulo}>{estado.nome} - Nv. {estado.nivel}</h1>
            
            <input 
                type="text" 
                placeholder="Nome do Herói" 
                value={estado.nome} 
                onChange={setNomePersonagem} 
                style={styles.input}
            />
            <select style={styles.input} onChange={(e) => atualizarEstado({ classe: e.target.value })}>
                {['Guerreiro', 'Mago', 'Arqueiro'].map(c => <option key={c}>{c}</option>)}
            </select>
            
            <button style={styles.botao} onClick={toggleEfeitos}>
                {estado.showEfeitos ? 'Esconder Efeitos' : 'Mostrar Efeitos'}
            </button>
            {estado.showEfeitos && <p style={styles.feedback}>Efeitos: {estado.statusEfeitos.join(', ')}</p>}
            
            <div style={styles.painel}>
                <h3>Combate (HP: {estado.vidaAtual}/{estado.vidaMaxima})</h3>
                <div style={{ ...styles.barraBase, borderColor: getCorVida(estado.vidaAtual, estado.vidaMaxima) }}>
                    <div 
                        style={{ 
                            ...styles.barraProgresso, 
                            width: `${(estado.vidaAtual / estado.vidaMaxima) * 100}%`,
                            backgroundColor: getCorVida(estado.vidaAtual, estado.vidaMaxima),
                            boxShadow: (getCorVida(estado.vidaAtual, estado.vidaMaxima) === 'red') ? '0 0 5px red' : 'none'
                        }}
                    >
                    </div>
                    <span style={styles.barraTexto}>Vida</span>
                </div>
                <button style={styles.botaoAcao} onClick={sofrerDano}>DANO (-15 HP)</button>
                <button style={styles.botaoAcao} onClick={curar}>CURAR (+10 HP c/ Poção)</button>
            </div>

            <div style={styles.painel}>
                <h3>XP (Próximo Nível: {estado.xpProximoNivel})</h3>
                <div style={styles.barraBase}>
                    <div 
                        style={{ 
                            ...styles.barraProgresso, 
                            width: `${(estado.xpAtual / estado.xpProximoNivel) * 100}%`,
                            backgroundColor: '#17a2b8'
                        }}
                    >
                    </div>
                    <span style={styles.barraTexto}>{estado.xpAtual} XP</span>
                </div>
                <button style={styles.botaoAcao} onClick={derrotarInimigo}>Derrotar Inimigo (+50 XP)</button>
            </div>
            
            <div style={styles.painel}>
                <h3>Atributos (Pts. Disponíveis: {estado.pontosAtributos})</h3>
                {Object.keys(estado.atributos).map(attr => (
                    <div key={attr} style={styles.atributoItem}>
                        {attr.toUpperCase()}: {estado.atributos[attr]}
                        <button 
                            style={styles.botaoIncremento} 
                            onClick={() => incrementarAtributo(attr)} 
                            disabled={estado.pontosAtributos === 0}
                        >
                            +
                        </button>
                    </div>
                ))}
            </div>

            <div style={styles.painel}>
                <button style={styles.botaoToggle} onClick={toggleInventario}>
                    {estado.inventarioAberto ? 'FECHAR INVENTÁRIO 🎒' : 'ABRIR INVENTÁRIO 👝'}
                </button>
                {estado.inventarioAberto && (
                    <div style={styles.lista}>
                        {estado.itens.map(item => <p key={item.id} style={styles.item}>{item.nome}</p>)}
                    </div>
                )}
            </div>

            <div style={styles.painel}>
                <h3>Missões Ativas ({estado.missoesCompletas} Completas)</h3>
                <input 
                    type="text" 
                    placeholder="Título da Missão" 
                    value={novaMissaoTitulo} 
                    onChange={(e) => setNovaMissaoTitulo(e.target.value)} 
                    style={styles.input}
                />
                <select 
                    value={novaMissaoCategoria} 
                    onChange={(e) => setNovaMissaoCategoria(e.target.value)}
                    style={styles.inputSmall}
                >
                    <option>Principal</option><option>Secundária</option><option>Urgente</option>
                </select>
                <button style={styles.botaoAcao} onClick={adicionarNovaMissao}>Adicionar</button>
                
                {estado.missoesAtivas.map(missao => (
                    <div key={missao.id} style={styles.missaoItem}>
                        <p style={{margin:0}}>**[{missao.categoria}]** {missao.titulo}</p>
                        <button style={styles.botaoAcao} onClick={() => marcarMissaoConcluida(missao.id)}>Concluir</button>
                    </div>
                ))}
            </div>
            
            <div style={styles.painel}>
                <h3>Gerador de Encantamentos</h3>
                <input
                    type="text"
                    placeholder="Palavra Mágica Base"
                    value={estado.palavraMagica}
                    onChange={(e) => atualizarEstado({ palavraMagica: e.target.value })}
                    style={styles.input}
                />
                <button style={styles.botaoAcao} onClick={gerarEncantamento}>Gerar Encantamento</button>
                <p style={styles.feedback}>{estado.encantamentoGerado}</p>
            </div>

            <div style={styles.painel}>
                <h3>Ranking dos Heróis</h3>
                <ol style={styles.lista}>
                    {rankingOrdenado.map((heroi, index) => (
                        <li key={index} style={styles.rankingItem}>
                            #{index + 1}: {heroi.nome} (Nv. {heroi.nivel})
                        </li>
                    ))}
                </ol>
            </div>
            
            <div style={styles.painel}>
                <button style={styles.botaoToggle} onClick={toggleLoja}>
                    {estado.lojaAberta ? 'Fechar Loja' : `Abrir Loja (💰 ${estado.ouro})`}
                </button>
                {estado.lojaAberta && (
                    <div style={styles.lista}>
                        {estado.itensLoja.map(item => (
                            <div key={item.id} style={styles.missaoItem}>
                                <p style={{margin:0}}>{item.nome} | {item.custo} Ouro</p>
                                <button 
                                    style={styles.botaoAcao} 
                                    onClick={() => comprarItem(item)}
                                    disabled={estado.ouro < item.custo}
                                >
                                    Comprar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        fontFamily: 'sans-serif'
    },
    titulo: {
        textAlign: 'center',
        borderBottom: '2px solid #ccc',
        paddingBottom: '10px'
    },
    painel: {
        border: '1px solid #eee',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        backgroundColor: '#fff'
    },
    input: {
        padding: '5px',
        margin: '5px 0',
        width: 'calc(100% - 10px)',
    },
    inputSmall: {
        padding: '5px',
        margin: '5px 5px 5px 0',
    },
    botao: {
        padding: '5px 10px',
        margin: '5px 5px 5px 0',
        cursor: 'pointer',
    },
    botaoAcao: {
        padding: '5px 10px',
        margin: '5px 5px 5px 0',
        cursor: 'pointer',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
    },
    botaoToggle: {
        padding: '10px',
        width: '100%',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        marginBottom: '5px'
    },
    barraBase: {
        position: 'relative',
        height: '20px',
        backgroundColor: '#ddd',
        borderRadius: '5px',
        overflow: 'hidden',
        marginBottom: '5px',
        border: '1px solid #333'
    },
    barraProgresso: {
        height: '100%',
        transition: 'width 0.5s ease-in-out',
    },
    barraTexto: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        lineHeight: '20px',
        color: '#333',
        fontWeight: 'bold',
        fontSize: 'small'
    },
    lista: {
        marginTop: '5px',
        paddingTop: '5px',
        borderTop: '1px solid #eee'
    },
    item: {
        margin: '3px 0',
    },
    missaoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0',
        borderBottom: '1px dotted #eee'
    },
    rankingItem: {
        padding: '3px 0',
    },
    atributoItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px'
    },
    botaoIncremento: {
        marginLeft: '10px',
        padding: '3px 8px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer'
    },
    feedback: {
        marginTop: '5px',
        fontStyle: 'italic',
        color: '#ff6347'
    }
};

export default RPGSimplesMinificado;