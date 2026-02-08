import "../styles/GameOverScreen.css";

export default function GameOverScreen({ currentScore, bestScore, handleResetGame, gameWon }) {
  console.log("gameWon", gameWon);
  return (
    <div className="game-over-screen-wrapper">
      <div>
        <div>
          <h2>{!gameWon ? "Game Over!" : "You Win!"}</h2>
          <span>{!gameWon ? "Oops! You clicked the same Pokémon twice!" : "You clicked all of the Pokémon only once!"}</span>
        </div>
        <div>
          <div>
            <h3>Your Score</h3>
            <span>{currentScore}</span>
          </div>
          <div>
            <h3>Best Score</h3>
            <span>{bestScore}</span>
          </div>
        </div>
        <span>{!gameWon ? "Keep playing to beat your high score!" : "🏆"}</span>
        <button type="button" onClick={handleResetGame}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
