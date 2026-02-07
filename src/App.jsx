import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const pokemonNames = ["pikachu", "charizard", "bulbasaur", "charmander", "squirtle", "eevee", "jigglypuff", "gengar", "snorlax", "lapras", "dragonite", "mewtwo"];
  const [initialPokemonData, setInitialPokemonData] = useState([]);
  const [exampleName, setExampleName] = useState(null);
  const pokemonDataFetched = useRef(false);

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

        console.log("initialFetchedPokemonData", initialFetchedPokemonData);
        setInitialPokemonData(initialFetchedPokemonData);
      };

      fetchPokemonData();

      //
    }
  }, []);

  const [randomizedPokemon, setRandomizedPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState([]);
  const [bestScore, setBestScore] = useState([]);
  const [currentRoundClickedPokemon, setCurrentRoundClickedPokemon] = useState([]);
  const handlePokemonCardClick = () => {};

  //console.log("initialPokemonData.current", initialPokemonData.current);

  function randomizePokemonOrder() {
    const randomizedPokemon = [];
    const usedIndexNumbers = [];
    console.log("initialPokemonData.current Indy", initialPokemonData.current.length);
    for (let i = 1; i < 13; i++) {
      let randomIndexNumber = Math.floor(Math.random() * 12);
      while (usedIndexNumbers.includes(randomIndexNumber)) {
        randomIndexNumber = Math.floor(Math.random() * 12);
      }

      console.log("randomIndexNumber", randomIndexNumber);

      randomizedPokemon.push(initialPokemonData.current);
    }
    console.log("randomizedPokemon", randomizedPokemon);
  }
  console.log("pokeoe", pokemonDataFetched);

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
        <div className="pokemon-card">
          <span>{pokemonDataFetched.current && initialPokemonData[3].name}</span>
          <img src="/public/images/favicon.png" alt="" />
        </div>
        <div className="pokemon-card">
          <span>Pika Pika</span>
          <img src="/public/images/favicon.png" alt="" />
        </div>
        <div className="pokemon-card">
          <span>Pika Pika</span>
          <img src="/public/images/favicon.png" alt="" />
        </div>
        <div className="pokemon-card">
          <span>Pika Pika</span>
          <img src="/public/images/favicon.png" alt="" />
        </div>
        <div className="pokemon-card">
          <span>Pika Pika</span>
          <img src="/public/images/favicon.png" alt="" />
        </div>
        <div className="pokemon-card">
          <span>Pika Pika</span>
          <img src="/public/images/favicon.png" alt="" />
        </div>
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
