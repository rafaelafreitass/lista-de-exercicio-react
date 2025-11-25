import './App.css'
import React from 'react';




function ListaComidas() {
  const comidas = ['parmegiana', 'pizza', 'açaí', 'macarrão'];
  return (
    <div>
      <h2>minhas comidas favoritas</h2>
      <ol>
        {comidas.map((comida, index) => (
          <li key={index}>{comida}</li>))}
      </ol>
    </div>
  );
}
export default ListaComidas;