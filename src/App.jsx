import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
   const [userInput, setUserInput] = useState('');

    const fetchPokemon= async () => {
      try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json.name);
      }
      catch{

      }};

      const handleInputChange = (event) => {
        setUserInput(event.target.value);
      };

  return (
    <>
      <div>
        <img
          src='src/assets/Pokeball.png'
          alt='Image of a classic Pokeball'
          width='100'
          height='100'
        />
      </div>
      <div>
        <h1>Pokemon for Grandmas</h1>
        <input
          type='text'
          value={userInput}
          onChange={handleInputChange}
          placeholder='Enter Pokemon Name'
        ></input>
        <button onClick={fetchPokemon}>Fetch Pokemon</button>
      </div>
    </>
  );
}

export default App;
//  
