import { useState } from 'react'
import './App.css'




function Contador() {
  const [texto, setTexto] = useState('');
  return (
    <div>
      <h2>Você digitou: {texto.toLocaleUpperCase()}</h2>
      <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder='Digite algo...' />
    </div>
  );
}
export default Contador;