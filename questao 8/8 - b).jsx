import { useState } from 'react'
import './App.css'


function adicionarTarefa() {
  const [item, setItem] = useState('');
  const [tarefa, setTarefa] = useState([]);


  const novaTarefa = () => {
    if (item.trim()) {
      setTarefa([...tarefa, item]);
      setItem('');
    }
  }
  return (
    <div>
      <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder='Adicione a Tarefa' />
      <button onClick={novaTarefa}>Adicionar</button>


      <ul>
        {tarefa.map((itemTarefa, index) => (<li key={index}>{itemTarefa}</li>))}


      </ul>
    </div>
  );
}


export default adicionarTarefa;