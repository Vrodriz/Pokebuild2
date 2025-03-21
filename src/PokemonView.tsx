import React, { useState, useEffect } from 'react';
import { fetchPokemonList } from './services/fetchPokemonList';
import { Pokemon } from './types/Pokemon';
import { toast } from 'sonner';
import { Container, TeamSection, PokemonSection, PokemonCard, PokemonGrid, PokemonTypes } from './components/Styles';

const App: React.FC = () => {
  // Estado para armazenar os 6 Pokémon no time, inicialmente preenchido com `null`
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
  
  // Estado para armazenar a lista completa de Pokémon carregados da API
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  
  // Estado para armazenar o termo de busca digitado pelo usuário
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para indicar se os Pokémon ainda estão sendo carregados da API
  const [loading, setLoading] = useState(true);

  // Efeito que busca a lista de Pokémon ao carregar o componente
  useEffect(() => {
    setLoading(true);
    fetchPokemonList()
      .then((pokemon) => {
        setPokemonList(pokemon);
      })
      .catch((_error) => {
        toast.error('Erro ao carregar Pokémon.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Filtra a lista de Pokémon de acordo com o termo de busca (nome ou ID)
  const filteredList = searchTerm
    ? pokemonList.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm)
      )
    : pokemonList;

  // Função para adicionar um Pokémon ao time
  const addToTeam = (pokemon: Pokemon) => {
    // Verifica se o Pokémon já está no time
    if (team.some((p) => p?.id === pokemon.id)) {
      toast.error(`${pokemon.name} já está no time!`);
      return;
    }

    // Encontra o primeiro espaço vazio no time e adiciona o Pokémon
    const emptySlot = team.findIndex((p) => p === null);
    if (emptySlot !== -1) {
      const newTeam = [...team];
      newTeam[emptySlot] = pokemon;
      setTeam(newTeam);
      toast.success(`${pokemon.name} foi adicionado ao time!`);
    } else {
      toast.error('Time completo!');
    }
  };

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
    steel: "#839192"
  };

  return (
    <Container>
      {/* Seção do time do usuário */}
      <TeamSection>
        <h2>Meu Time</h2>
        <PokemonGrid>
          {team.map((pokemon, index) => (
            <div key={index} onClick={() => removeFromTeam(index)}>
              {pokemon ? (
                <>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  <p>{pokemon.name}</p>
                </>
              ) : (
                <div className="empty-slot">Vazio</div>
              )}
            </div>
          ))}
        </PokemonGrid>
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
        
        {/* Botão para gerar um time aleatório */}
        <button onClick={randomizeTeam}>Gerar time aleatório</button>

        {/* Grade de Pokémon disponíveis */}
        <PokemonGrid>
          {loading ? (
            <p>Carregando...</p>
          ) : filteredList.length > 0 ? (
            filteredList.map((pokemon) => (
              <PokemonCard key={pokemon.id} onClick={() => addToTeam(pokemon)}>
                <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                <p>{pokemon.name}</p>
                <PokemonTypes>
                  {/* Exibe os tipos do Pokémon com cores associadas */}
                  {pokemon.types.map((type, index) => (
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
    </Container>
  );
};

export default App;
