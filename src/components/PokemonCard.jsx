import "../styles/PokemonCard.css";

export default function PokemonCard({ pokemonName, pokemonImageUrl, handlePokemonCardClick }) {
  return (
    <div className="pokemon-card" onClick={() => handlePokemonCardClick(pokemonName)}>
      <span>{pokemonName}</span>
      <img src={pokemonImageUrl} alt={pokemonName} />
    </div>
  );
}
