import "../styles/HowToPlayScreen.css";

export default function HowToPlayScreen({ handleHowToPlayButtonClick }) {
  return (
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
        <button type="button" onClick={handleHowToPlayButtonClick}>
          Close
        </button>
      </div>
    </div>
  );
}
