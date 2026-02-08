import { useState, useEffect, useRef } from "react";
import PokemonCard from "./components/PokemonCard";
import GameOverScreen from "./components/GameOverScreen";
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
  const [showGameOverScreen, setShowGameOverScreen] = useState(false);

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

  const resetGame = () => {
    setisGameOver(false);
    setCurrentScore(0);
    currentRoundClickedPokemon.current = [];
  };

  const checkForGameOver = (pokemonName) => {
    if (currentRoundClickedPokemon.current.includes(pokemonName)) {
      setisGameOver(true);
      if (currentScore > bestScore.current) {
        bestScore.current = currentScore;
      }
    } else {
      currentRoundClickedPokemon.current.push(pokemonName);
      setCurrentScore(currentScore + 1);
      console.log("currentRoundClickedPokemon", currentRoundClickedPokemon);
    }
  };

  const handlePokemonCardClick = (pokemonName) => {
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

  if (pokemonDataFetched.current && !isGameOver) {
    randomizePokemonOrder();
  }

  return (
    <>
      {isGameOver && <GameOverScreen currentScore={currentScore} bestScore={bestScore.current} handleResetGame={resetGame} />}
      {/* <div className="how-to-play-screen-wrapper">
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
      </div> */}

      <header>
        <div>
          <h1>Pokémon Memory Game</h1>
          <p>Click on each Pokémon only once! Cards shuffle after every click.</p>
        </div>
        <button>How To Play</button>
      </header>
      <main className="gameboard">
        {pokemonDataFetched.current && !isGameOver
          ? randomizedPokemon.map((pokemonCard) => (
              <PokemonCard pokemonName={pokemonCard.name} pokemonImageUrl={pokemonCard.imgageUrl} key={pokemonCard.id} handlePokemonCardClick={handlePokemonCardClick} />
            ))
          : initialPokemonData.map((pokemonCard) => (
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
            <span>{bestScore.current}</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
