import { useState } from 'react'
import './App.css'


function Calculadora() {
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);


  const calcular = (operacao) => {
    let res
    switch (operacao) {
      case 'soma': res = Number(n1) + Number(n2); break;
      case 'sub': res = Number(n1) - Number(n2); break;
      case 'mult': res = Number(n1) * Number(n2); break;
      case 'div': res = Number(n1) / Number(n2); break;
    }
    document.getElementById(“resul”).innerText = ‘Resultado: ${ res }’
  }
  return (
    <div>
      <h2>Calculadora</h2>
      <input type="number" value={n1} onChange={(e) => setN1(e.target.value)}/>
      <input type="number" value={n2} onChange={(e) => setN2(e.target.value)}/>
      <button onClick={() => calcular(“soma”)}>Soma</button>
      <button onClick={() => calcular(“sub”)}>Subtração</button>
      <button onClick={() => calcular(“mult”)}>Multiplicação</button>
      <button onClick={() => calcular(“div”)}>Divisão</button>
      <h2 id=’resul’>Resultado: </h2>
    </div >
  );
};




export default Calculadora