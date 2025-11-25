import React, { useState } from 'react';
const ICONE_CADEADO_FECHADO = '🔒';
const ICONE_CADEADO_ABERTO = '🔓';
function CofreDigital() {
  const [estaAberto, setEstaAberto] = useState(false);
  const alternarCofre = () => {
    setEstaAberto(estadoAnterior => !estadoAnterior);
  };
  const conteudoPrecioso = (
    <div>
      <h3></h3>
      <ul>
        <li>Um único Anel de Ouro</li>
        <li>O mapa do tesouro da vovó</li>
        <li>A senha do Wi-Fi</li>
        <li>Chaves sobressalentes</li>
      </ul>
    </div>
  );
  return (
    <div>
      <h1>Cofre Digital</h1>
      { }
      <button onClick={alternarCofre}>
        { }
        {estaAberto ? "Trancar Cofre" : "Abrir Cofre"}
      </button>
      <hr />
      { }
      {estaAberto ? (
        <div>
          <h2>{ICONE_CADEADO_ABERTO} Cofre Aberto</h2>
          {conteudoPrecioso}
        </div>
      ) : (
        <div>
          <h2>{ICONE_CADEADO_FECHADO} Cofre Trancado</h2>
        </div>
      )}
    </div>
  );
}
export default CofreDigital;