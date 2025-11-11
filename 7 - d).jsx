import React, { useState } from 'react';




function ContadorBasico() {
  const LIMITE = 50;
  const [texto, setTexto] = useState('');


  const lidarComMudanca = (evento) => {


    setTexto(evento.target.value);
  };


  return (
    <div>
      <h3>Contador Básico</h3>


      { }
      <textarea
        value={texto}
        onChange={lidarComMudanca}
        maxLength={LIMITE}
        rows="3"
        cols="30"
      />


      { }
      <p>
        {texto.length}/{LIMITE}
      </p>


      { }
      <p>
        Texto atual: {texto}
      </p>
    </div>
  );
}


export default ContadorBasico;