import React, { useState } from 'react';


const IMAGE_URL = 'https://i.redd.it/nu-metal-guys-doing-the-grab-your-balls-pose-v0-ubruqkkxmmhc1.jpg?width=736&format=pjpg&auto=webp&s=72d14f643433586303e8db8663d56b192d80dcd9';
function AlternarImagem() {

  const [estaVisivel, setEstaVisivel] = useState(false);


  const textoBotao = estaVisivel ? "Ocultar Foto" : "Exibir Foto";


  const handleClick = () => {
    setEstaVisivel(estadoAnterior => !estadoAnterior);
  };


  return (
    <div>
      <h1></h1>


      { }
      <button onClick={handleClick}>
        {textoBotao}
      </button>


      <hr />


      { }
      {estaVisivel && (
        <img
          src={IMAGE_URL}
          alt="Foto aleatória de exemplo"
        />
      )}


      { }
      {!estaVisivel && (
        <p>
          A imagem está oculta no momento.
        </p>
      )}
    </div>
  );
}


export default AlternarImagem;