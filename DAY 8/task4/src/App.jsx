import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App({ name,major, year })  {
  name="balaji";
  major="IT";
  year=3;
  
  return (
    

    <div className="card">
      <h2>{name}</h2>
      <p>
        <strong>Major:</strong> {major}
      </p>
      <p>
        <strong>Year:</strong> {year}
      </p>
      
    </div>
  );
};

export default App;

