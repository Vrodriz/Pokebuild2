import { typeColors } from "../constants/typeColors";
import { Pokemon } from "../types/Pokemon";
import { PokemonCard, PokemonGrid, PokemonSection, PokemonTypes } from "./Styles";


const PokemonList: React.FC<{ pokemonList: Pokemon[], addToTeam: (pokemon: Pokemon) => void }> = ({ pokemonList, addToTeam }) => (
    <PokemonSection>
      <h2>Pokémon Disponíveis</h2>
      <PokemonGrid>
        {pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} onClick={() => addToTeam(pokemon)}>
              <img src={pokemon.sprites?.other["official-artwork"]?.front_default} alt={pokemon.name} />
              <p>{pokemon.name}</p>
              <PokemonTypes>
                {pokemon.types?.map((type, index) => (
                  <span key={index} style={{ backgroundColor: typeColors[type.type.name] || "gray" }}>
                    {type.type.name}
                  </span>
                ))}
              </PokemonTypes>
            </PokemonCard>
          ))
        ) : (
          <p>Nenhum Pokémon encontrado.</p>
        )}
      </PokemonGrid>
    </PokemonSection>
  );

  export default PokemonList
  