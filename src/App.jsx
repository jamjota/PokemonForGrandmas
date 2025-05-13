import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [filteredMons, setFilteredMons] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);

  //this fetches the API data and filters it into an array of lightweight poke' objs (name, url only so far)
  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=151`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const results = data.results;
      // console.log('data:', data);

      // this takes the results and iterates over them to fetch the additional data from their urls
      const pokemon = [];

      for (const stubs of results) {
        stubs.data = await fetch(stubs.url).then((res) => res.json());
        pokemon.push(stubs.data);
      }

      const matches = pokemon.filter((p) =>
        p.types.some((t) => t.type.name === userInput.toLowerCase())
      );
      setFilteredMons(matches.map((m) => m.sprites.front_default));
      setFilteredNames(matches.map((m) => m.name));
      //
      // console.log('filtered mons:', filteredMons)
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    // console.log('user input:', userInput);
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
        <h3>
          Just type what you know about that pokemon and we'll find you 'mons
          that match!
        </h3>
      </div>
      <div>
        <input
          type='text'
          value={userInput}
          onChange={handleInputChange}
          placeholder='Enter Pokemon Info'
        ></input>
        <button onClick={fetchPokemon}>Fetch Pokemon</button>
      </div>

      {/* This section is to change from input text to drop down menu (not done yet, though!)
      <div className='dropdown'>
        <button onClick={fetchPokemon} className='dropbtn'>
          Type
        </button>
        <div id='myDropdown' className='dropdown-content'>
          <a href='#'>Fire</a>
          <br />
          <a href='#'>Grass</a>
          <br />
          <a href='#'>Water</a>
          <br />
        </div>
      </div>
      <div className='dropdown'>
        <button onClick={fetchPokemon} className='dropbtn'>
          Size
        </button>
        <div id='myDropdown' className='dropdown-content'>
          <a href='#'>Less than 50kg</a>
          <br />
          <a href='#'>50-100kg</a>
          <br />
          <a href='#'>More than 100kg</a>
          <br />
        </div>
      </div>
      <div className='dropdown'>
        <button onClick={fetchPokemon} className='dropbtn'>
          Games
        </button>
        <div id='myDropdown' className='dropdown-content'>
          <a href='#'>Red</a>
          <br />
          <a href='#'>Blue</a>
          <br />
          <a href='#'>Yellow</a>
          <br />
        </div>
      </div> */}
      <br />
      <div>
        {filteredMons.map((mons, i) => (
          <span key={i} style={{ marginRight: '0.5rem' }}>
            <img src={mons} alt='image of pokemon' title={filteredNames[i]} />
          </span>
        ))}
      </div>
    </>
  );
}
//just adding a comment into here so I can commit the details

export default App;
