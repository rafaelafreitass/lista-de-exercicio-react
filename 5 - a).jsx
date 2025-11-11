import { useState } from 'react'
import reactLogo from './assets/react.svg'
import vitelogo from '/vite.svg'
import './app.css'


function contador() {
  const [count, setcount] = usestate(0);


  return (
    <div>
      <h2> contador: {count}</h2>
      <button onClick={() => setcount(count + 1)}>+1</button>
      <button onClick={() => setcount(count - 1)}>+1</button>
    </div>
  );
}


export default contador;