import { Pokemon } from "../types/Pokemon";
import { PokemonTeamSlot, PokemonTypes, TeamGrid, TeamSection } from "./Styles";



const Team: React.FC<{
  team: (Pokemon | null)[];
  removeFromTeam: (index: number) => void;
}> = ({ team, removeFromTeam }) => 
 (
    <TeamSection>
      <h2>Meu Time</h2>
      <TeamGrid>
        {team.map((pokemon, index) => (
          <PokemonTeamSlot key={index} onClick={() => removeFromTeam(index)}>
            {pokemon ? (
              <>
                <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                <p>{pokemon.name}</p>
                {pokemon.types.map((item, i) => (
                  <PokemonTypes key={i}>{item.type.name}</PokemonTypes>
                ))}
              </>
            ) : (
              <div className="empty-slot">Slot Vazio</div>
            )}
          </PokemonTeamSlot>
        ))}
      </TeamGrid>
    </TeamSection>
  );
  export default Team;


  