import { useState, useEffect, useRef } from "react";
import PokemonCard from "./components/PokemonCard";
import "./styles/App.css";

function App() {
  const pokemonNames = ["pikachu", "charizard", "bulbasaur", "charmander", "squirtle", "eevee", "jigglypuff", "gengar", "snorlax", "lapras", "dragonite", "mewtwo"];
  const [initialPokemonData, setInitialPokemonData] = useState([]);
  const pokemonDataFetched = useRef(false);

  let randomizedPokemon = useRef(null);
  const [currentScore, setCurrentScore] = useState(0);
  const bestScore = useRef(0);
  const [isGameOver, setisGameOver] = useState(false);
  const currentRoundClickedPokemon = useRef([]);

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

  const checkForGameOver = (pokemonName) => {
    if (currentRoundClickedPokemon.current.includes(pokemonName)) {
      setisGameOver(true);
    }
  };

  const handlePokemonCardClick = (pokemonName) => {
    setCurrentScore(currentScore + 1);
    console.log("currentRoundClickedPokemon", currentRoundClickedPokemon);
    currentRoundClickedPokemon.current.push(pokemonName);
    checkForGameOver(pokemonName);
  };

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
  }

  return (
    <>
      <div className="how-to-play-screen-wrapper">
        <div>
          <h2>How To Play</h2>
          <ol>
            <li>Click on any Pokémon card</li>
            <li>Cards will shuffle after each click</li>
            <li>Try to click each Pokémon only once</li>
            <li>If you click the same Pokémon twice, game over!</li>
            <li>Goal: Click all 12 Pokémon without repeating</li>
          </ol>
          <button type="button">Close</button>
        </div>
      </div>

      {/* <div className="game-over-screen-wrapper">
        <div>
          <div>
            <h2>Game Over!</h2>
            <span>Oops! You clicked the same Pokémon twice!</span>
          </div>
          <div>
            <div>
              <h3>Your Score</h3>
              <span>{currentScore}</span>
            </div>
            <div>
              <h3>Best Score</h3>
              <span>0</span>
            </div>
          </div>
          <span>Keep playing to beat your high score!</span>
          <button type="button">PLAY AGAIN</button>
        </div>
      </div> */}
      <header>
        <div>
          <h1>Pokémon Memory Game</h1>
          <p>Click on each Pokémon only once! Cards shuffle after every click.</p>
        </div>
        <button>How To Play</button>
      </header>
      <main className="gameboard">
        {pokemonDataFetched.current &&
          randomizedPokemon.map((pokemonCard) => (
            <PokemonCard pokemonName={pokemonCard.name} pokemonImageUrl={pokemonCard.imgageUrl} key={pokemonCard.id} handlePokemonCardClick={handlePokemonCardClick} />
          ))}
      </main>
      <footer>
        <div>
          <div>
            <h2>Current Score</h2>
            <span>{currentScore}</span>
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
