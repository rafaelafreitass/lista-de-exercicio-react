import React, { useState } from 'react';


function AlternarTexto() {
  const [estaVisivel, setEstaVisivel] = useState(false);
  const textoBotao = estaVisivel ? "Esconder Texto" : "Mostrar Texto";
  const handleClick = () => {
    setEstaVisivel(estadoAnterior => !estadoAnterior);
  };
  return (
    <div>
      <h1> </h1>
      { }
      <button onClick={handleClick}>
        {textoBotao}
      </button>
      <hr />
      { }
      { }
      {estaVisivel && (
        <p>
          Parabéns! Este é o texto secreto!
        </p>
      )}
      { }
      {!estaVisivel && (
        <p>
          O conteúdo está escondido. Clique em "Mostrar Texto".
        </p>
      )}
    </div>
  );
}
export default AlternarTexto;