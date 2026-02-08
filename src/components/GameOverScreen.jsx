import "../styles/GameOverScreen.css";

export default function GameOverScreen({ currentScore, bestScore, handleResetGame }) {
  return (
    <div className="game-over-screen-wrapper">
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
            <span>{bestScore}</span>
          </div>
        </div>
        <span>Keep playing to beat your high score!</span>
        <button type="button" onClick={handleResetGame}>
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}
