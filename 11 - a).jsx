import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function formulariotemporeal() {
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    idade: 0
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({
      ...dados,
      [name]: value
    });
  };


  return (
    <div>
      <h2>formulário</h2>
      <form>
        <div>
          <label>nome:</label>
          <input type='text'
            name='nome'
            value={dados.nome}
            onChange={handleChange}
          />
        </div>


        <div>
          <label>email:</label>
          <input type='text'
            name='email'
            value={dados.email}
            onChange={handleChange}
          />
        </div>


        <div>
          <label>idade:</label>
          <input
            type='number'
            name='idade'
            value={dados.idade}
            onChange={handleChange}
          />
        </div>
      </form>
      <div>
        <h3>dados preenchidos</h3>
        <p><strong>nome:</strong>{dados.nome}</p>
        <p><strong>email:</strong>{dados.email}</p>
        <p><strong>idade:</strong>{dados.idade}</p>
      </div>
    </div>
  );
}


export default formulariotemporeal