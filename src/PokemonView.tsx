import React, { useState } from "react";
import { Pokemon } from "./types/Pokemon";
import { ThemeProvider } from "styled-components";
import { Container, TeamSection, PokemonSection, PokemonCard, PokemonGrid, PokemonTypes, TeamGrid, PokemonTeamSlot, theme } from "./components/Styles";

import usePokemonQuery from "./hooks/usePokemonQuery";
import usePokemonTeam from "./hooks/usePokemonTeam";
import { typeColors } from "./constants/typeColors";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: pokemonList = [], isLoading, isError } = usePokemonQuery();
  const { team, addToTeam, removeFromTeam, randomizeTeam, clearTeam } = usePokemonTeam();

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar Pokémon.</p>;

  const filteredList = searchTerm
    ? pokemonList.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toString().includes(searchTerm)
      )
    : pokemonList;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Seção do time */}
        <TeamSection>
          <h2>Meu Time</h2>
          <TeamGrid>
            {team.map((pokemon, index) => (
              <PokemonTeamSlot key={index} onClick={() => removeFromTeam(index)}>
                {pokemon ? (
                  <>
                    <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                    <p>{pokemon.name}</p>
                    {pokemon.types.map((type, i) => (
                      <PokemonTypes key={i}>{type.type.name}</PokemonTypes>
                    ))}
                  </>
                ) : (
                  <div className="empty-slot">Slot Vazio</div>
                )}
              </PokemonTeamSlot>
            ))}
          </TeamGrid>
          <button onClick={clearTeam}>Limpar Time</button>
        </TeamSection>

       
        <PokemonSection>
          <h2>Pokémon Disponíveis</h2>
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => randomizeTeam(pokemonList)}>Gerar time aleatório</button>

          <PokemonGrid>
            {filteredList.length > 0 ? (
              filteredList.map((pokemon: Pokemon) => (
                <PokemonCard key={pokemon.id} onClick={() => addToTeam(pokemon)}>
                  <img src={pokemon.sprites?.other["official-artwork"]?.front_default} alt={pokemon.name} />
                  <p>{pokemon.name}</p>
                  <PokemonTypes>
                    {pokemon.types.map((type, index) => (
                      <span
                        key={index}
                        style={{ backgroundColor: typeColors[type.type.name] || "gray" }}
                      >
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
      </Container>
    </ThemeProvider>
  );
};

export default App;
