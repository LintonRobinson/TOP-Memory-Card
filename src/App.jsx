import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <div>
          <h1>Pokémon Memory Game</h1>
          <p>Click on each Pokémon only once! Cards shuffle after every click.</p>
        </div>
        <button>How To Play</button>
      </header>
      <main></main>
      <footer>
        <div>
          <h2>Current Score</h2>
          <span>0</span>
        </div>
        <div>
          <h2>Best Score</h2>
          <span>0</span>
        </div>
      </footer>
    </>
  );
}

export default App;
