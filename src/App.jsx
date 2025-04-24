import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [filteredMons, setFilteredMons] = useState([])

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
  
      for (const stubs of results){
        stubs.data = await fetch(stubs.url).then((res) => res.json());
        pokemon.push(stubs.data);
      }
      // console.log('Pokemon array:', pokemon); 
      // now iterate over the new array full of data and find the pokemon that fit the userInput type
      // let filteredMons = [];
      // for(let i = 0; i<pokemon.length; i++){
      //   if(userInput.toLowerCase() === pokemon[i].types[0].type.name || pokemon[i].types.length > 1 && userInput.toLowerCase() === pokemon[i].types[1].type.name){
      //     filteredMons.push(pokemon[i].name)
      //   }
      //   // else console.log('no pokemon found')
      //   console.log('filtered array', filteredMons);
      // }
      const matches = pokemon.filter(p =>
        p.types.some(t => t.type.name === userInput.toLowerCase())
      );
      setFilteredMons(matches.map(m => m.name));
      // m.sprites.front_default
      // console.log('type example:', pokemon[0].types[0].type.name, pokemon[0].types[1].type.name)
    } catch (error) {
      setError(error.message);
    }
    return filteredMons;
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
        <h3>Just type in what you know about that pokemon and we'll find you 'mons that match!</h3>
        <input
          type='text'
          value={userInput}
          onChange={handleInputChange}
          placeholder='Enter Pokemon Info'
        ></input>
        <button onClick={fetchPokemon}>Fetch Pokemon</button>
      </div><br/>
      <div>
        {filteredMons.map((mons, i) => (
          <span key={i} style={{ marginRight: "0.5rem" }}>
          {mons}
        </span>
        ))}
        <h5>Here is where the images would go, IF I HAD THEM</h5>
      </div>
    </>
  );
}

export default App;

