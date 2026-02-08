import { useState, useEffect, useRef } from "react";
import PokemonCard from "./components/PokemonCard";
import "./styles/App.css";

function App() {
  const pokemonNames = ["pikachu", "charizard", "bulbasaur", "charmander", "squirtle", "eevee", "jigglypuff", "gengar", "snorlax", "lapras", "dragonite", "mewtwo"];
  const [initialPokemonData, setInitialPokemonData] = useState([]);
  const pokemonDataFetched = useRef(false);

  let randomizedPokemon = useRef(null);
  const [currentScore, setCurrentScore] = useState([]);
  const [bestScore, setBestScore] = useState([]);
  const [currentRoundClickedPokemon, setCurrentRoundClickedPokemon] = useState([]);

  useEffect(() => {
    if (!pokemonDataFetched.current) {
      const fetchPokemonData = async () => {
        const initialFetchedPokemonData = [];
        try {
          for (let i = 0; i < 12; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNames[i]}`);
            const pokemonData = await response.json();
            initialFetchedPokemonData.push({
              id: pokemonData.id,
              name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
              imgageUrl: pokemonData.sprites.other["official-artwork"]["front_default"],
            });
            pokemonDataFetched.current = true;
          }
        } catch (error) {
          alert("There was an error");
          console.error(error.message);
        }
        setInitialPokemonData(initialFetchedPokemonData);
      };

      fetchPokemonData();
    }
  }, []);

  const handlePokemonCardClick = () => {};

  function randomizePokemonOrder() {
    const newRandomizedPokemon = [];
    const usedIndexNumbers = [];

    for (let i = 0; i < 12; i++) {
      let randomIndexNumber = Math.floor(Math.random() * 12);
      while (usedIndexNumbers.includes(randomIndexNumber)) {
        randomIndexNumber = Math.floor(Math.random() * 12);
      }

      usedIndexNumbers.push(randomIndexNumber);
      newRandomizedPokemon.push(initialPokemonData[randomIndexNumber]);
    }

    randomizedPokemon = newRandomizedPokemon;
  }

  if (pokemonDataFetched.current) {
    randomizePokemonOrder();
    console.log("randomizedPokemon", randomizedPokemon);
  }

  console.log("initialPokemonData", initialPokemonData);

  return (
    <>
      <header>
        <div>
          <h1>Pokémon Memory Game</h1>
          <p>Click on each Pokémon only once! Cards shuffle after every click.</p>
        </div>
        <button>How To Play</button>
      </header>
      <main className="gameboard">
        {pokemonDataFetched.current && randomizedPokemon.map((pokemonCard) => <PokemonCard pokemonName={pokemonCard.name} pokemonImageUrl={pokemonCard.imgageUrl} key={pokemonCard.id} />)}
      </main>
      <footer>
        <div>
          <div>
            <h2>Current Score</h2>
            <span>0</span>
          </div>
          <div>
            <h2>Best Score</h2>
            <span>0</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
