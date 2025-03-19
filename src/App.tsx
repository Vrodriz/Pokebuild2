import React, { useState, useEffect } from 'react';
import { fetchPokemonList } from './utils/PokemonCard';
import { Pokemon } from './types/Pokemon';
import { toast } from 'sonner';
import { Container, TeamSection, PokemonSection } from './components/StyledComponents';

const App: React.FC = () => {
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const pokemon = await fetchPokemonList();
        setPokemonList(pokemon);
      } catch (error) {
        toast.error('Erro ao carregar Pokémon.');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const filteredList = searchTerm
    ? pokemonList.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toString().includes(searchTerm)
    )
    : pokemonList;

  const addToTeam = (pokemon: Pokemon) => {
    if (team.includes(pokemon)) {
      toast.error(`${pokemon.name} já está no time!`);
      return;
    }

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

  const removeFromTeam = (index: number) => {
    const newTeam = [...team];
    if (newTeam[index]) {
      toast.info(`${newTeam[index]?.name} foi removido.`);
      newTeam[index] = null;
      setTeam(newTeam);
    }
  };

  return (
    <Container>
      <TeamSection>
        <h2>Meu Time</h2>
        {team.map((pokemon, index) => (
          <div key={index} onClick={() => removeFromTeam(index)}>
            {pokemon ? (
              <>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </>
            ) : (
              <p>Vazio</p>
            )}
          </div>
        ))}

      </TeamSection>

      <PokemonSection>
        <h2>Pokémon Disponíveis</h2>
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <p>Carregando...</p>
        ) : filteredList.length > 0 ? (
          filteredList.map((pokemon) => (
            <div key={pokemon.id} onClick={() => addToTeam(pokemon)}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          ))
        ) : (
          <p>Nenhum Pokémon encontrado.</p>
        )}
      </PokemonSection>
    </Container>
  );
};

export default App;
