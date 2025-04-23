import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

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
          id='pokemonName'
          placeholder='Enter Pokemon Name'
        ></input>
        <button>Fetch Pokemon</button>
      </div>
    </>
  );
}

export default App;
//  onClick={FetchPokemon}
