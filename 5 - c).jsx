import { useState } from 'react'
import reactLogo from './assets/react.svg'
import vitelogo from '/vite.svg'
import './app.css'


function contador() {
  const [count, setcount] = usestate(20);


  const getcolor = (temp) => {


    if (temp < 0) return "#4a90e2";
    if (temp < 30) return "#f5a623";
    return "#d0021b";
  };


  return (
    <div>


      <h2 style={{ color: getcolor(count) }}> contador: {count}°C</h2>
      <button onClick={() => setcount(count + 2)}>+2°C</button>
      <button onClick={() => setcount(count - 2)}>+2°C</button>
    </div>
  );
}


export default contador;