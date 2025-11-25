import React, { useState } from 'react'


function App() {
  return <AdicionarLista />
}
function AdicionarLista() {
  const [time, setTime] = useState("")
  const [pontos, setPontos] = useState(0)
  const [dici, setDici] = useState([])


  const adicionarItem = () => {


    if (pontos && time) {
      const obj = {
        nometime: time,
        pontuacao: pontos
      }
      setDici([...dici, obj].sort(function (a, b) {
        if (a.pontuacao > b.pontuacao) {
          return -1;
        }
        if (a.pontuacao < b.pontuacao) {
          return 1;
        }
        return 0;
      }))
      setPontos(0)
      setTime("")
    }
  }
  return (
    <>
      <div>
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder='Digite o nome do Time' /> <br />
        <input type="number" value={pontos} onChange={(e) => setPontos(e.target.value)} placeholder='Digite a Pontuação' /> <br />


        <button onClick={adicionarItem}>Adicionar time</button>


        <p>Lista de Times</p>
        <ul>
          {dici.map((itemLista, index) => (
            <li key={index}>  <strong>Pontos:</strong> {itemLista.pontuacao} <strong>Nome:</strong> {itemLista.nometime}</li>
          ))}
        </ul>


      </div>
    </>
  )
}


export default App;