import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1300`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data:', data);
      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  const narrowSearch = async () => {
    try {
      const list = (await fetchPokemon()).results;
      const filtered = list.filter((p) =>
        p.name.toLowerCase().includes(userInput.toLowerCase())
      );
      console.log('filtered:', filtered);
      return filtered;
    } catch (error) {
      setError(error.message);
    }
  };

  
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    console.log('user input:', userInput);
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
        <button onClick={narrowSearch}>Fetch Pokemon</button>
      </div>
    </>
  );
}

export default App;

