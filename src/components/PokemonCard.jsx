import "../styles/PokemonCard.css";

export default function PokemonCard({ pokemonName, pokemonImageUrl }) {
  return (
    <div className="pokemon-card">
      <span>{pokemonName}</span>
      <img src={pokemonImageUrl} alt="pokemonName" />
    </div>
  );
}
