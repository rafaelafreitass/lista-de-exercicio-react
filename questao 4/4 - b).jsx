import './App.css'
import React from 'react';




function CartaoLivro({ titulo, ano, autor, genero }) {
  return (
    <div classname="cartão-livro">
      <h2>{título}</h2>
      <p><strong>autor:</strong>{autor}</p>
      <p><strong>gênero:</strong>{genero}</p>
      <p><strong>ano:</strong>{ano}</p>
    </div>
  );
}
function App() {
  return (
    <div>
      <CartaoLivro autor="Franz Kafka" ano={1915} título="A metamorfose" genero="Drama" />
    </div>
  );
}
export default App;