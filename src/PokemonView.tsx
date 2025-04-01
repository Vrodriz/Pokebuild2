import React, { useCallback, useState } from "react";
import { Pokemon } from "./types/Pokemon";
import { toast } from "sonner";
import { Container, TeamSection, PokemonSection, PokemonCard, PokemonGrid, PokemonTypes, theme, TeamGrid, PokemonTeamSlot } from "./components/Styles";
import usePokemonQuery from "./hooks/usePokemonQuery";
import { ThemeProvider } from "styled-components";


const App: React.FC = () => {
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
  const [searchTerm, setSearchTerm] = useState("");

  const { data: pokemonList = [], isLoading, isError } = usePokemonQuery();

  const addToTeam = useCallback((pokemon: Pokemon) => {
    if (team.some((p) => p?.id === pokemon.id)) {
      toast.error(`${pokemon.name} já está no time!`);
      return;
    }

    const emptySlot = team.findIndex((p) => p === null);
    if (emptySlot !== -1) {
      setTeam((prevTeam) => {
        const newTeam = [...prevTeam];
        newTeam[emptySlot] = pokemon;
        return newTeam;
      });
      toast.success(`${pokemon.name} foi adicionado ao time!`);
    } else {
      toast.error("Time completo!");
    }
  }, [team]);

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar Pokémon.</p>;

  // Filtra a lista de Pokémon de acordo com o termo de busca (nome ou ID)
  const filteredList = searchTerm
    ? pokemonList.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)
    )
    : pokemonList;



  // Função para remover um Pokémon do time ao clicar nele
  const removeFromTeam = (index: number) => {
    if (team[index]) {
      const newTeam = [...team];
      toast.info(`${newTeam[index]?.name} foi removido.`);
      newTeam[index] = null;
      setTeam(newTeam);
    }
  };

  // Gera um time aleatório preenchendo os espaços vazios com Pokémon aleatórios
  const randomizeTeam = () => {
    const shuffled = [...pokemonList].sort(() => 0.5 - Math.random());
    const randomTeam = team.map((p) => (p === null ? shuffled.pop() ?? p : p));
    setTeam(randomTeam);
    toast.success("Time aleatório gerado!");
  };

  const clearTeam = () => {
    setTeam(Array(6).fill(null));
    toast.info("Todos os Pokémon foram removidos do time.");
  };


  // Mapeia os tipos de Pokémon para cores específicas para estilização
  const typeColors: { [key: string]: string } = {
    fire: "#FF5733",
    water: "#3498db",
    grass: "#2ecc71",
    electric: "#f1c40f",
    psychic: "#9b59b6",
    ice: "#5DADE2",
    dragon: "#76448A",
    dark: "#34495E",
    fairy: "#F8C471",
    normal: "#95A5A6",
    fighting: "#E74C3C",
    flying: "#AED6F1",
    poison: "#8E44AD",
    ground: "#D4AC0D",
    rock: "#A04000",
    bug: "#27AE60",
    ghost: "#7D3C98",
    steel: "#839192",
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        {/* Seção do time do usuário */}
        <TeamSection>
          <h2>Meu Time</h2>
          <TeamGrid>
            {team.map((pokemon, index) => (
              <PokemonTeamSlot key={index} onClick={() => removeFromTeam(index)}>
                {pokemon ? (
                  <>
                    <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                    <p>{pokemon.name}</p>

                    {pokemon.types.map((item, index) => (
                      <PokemonTypes>{item.type.name}</PokemonTypes>
                    ))}
                  </>
                ) : (
                  <div className="empty-slot">Slot Vazio</div>
                )}
              </PokemonTeamSlot>
            ))}
          </TeamGrid>
        </TeamSection>



        {/* Seção de Pokémon disponíveis para adicionar ao time */}
        <PokemonSection>
          <h2>Pokémon Disponíveis</h2>

          {/* Campo de busca para filtrar Pokémon */}
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={randomizeTeam}>Gerar time aleatório</button>

          {/* Grade de Pokémon disponíveis */}
          <PokemonGrid>
            {filteredList.length > 0 ? (
              filteredList.map((pokemon: Pokemon) => (
                <PokemonCard key={pokemon.id} onClick={() => addToTeam(pokemon)}>
                  <img src={pokemon.sprites?.other["official-artwork"]?.front_default} alt={pokemon.name} />
                  <p>{pokemon.name}</p>
                  <PokemonTypes>
                    {/* Exibe os tipos do Pokémon com cores associadas */}
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
      </ThemeProvider>
    </Container>
  );
};

export default App;
