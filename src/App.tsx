import React, { useState, useEffect } from 'react';
import { fetchPokemonList } from './utils/PokemonCard';
import { Pokemon } from './types/Pokemon';
import { toast } from 'sonner';
import { Container, TeamSection, PokemonSection } from './components/StyledComponents';

const App: React.FC = () => {
  const [team, setTeam] = useState<(Pokemon | null)[]>([null, null, null, null, null, null]);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const pokemon = await fetchPokemonList();
        setPokemonList(pokemon);
        setFilteredList(pokemon);
      } catch (error) {
        toast.error('Erro ao carregar Pokémon.');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredList(
        pokemonList.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.id.toString().includes(searchTerm)
        )
      );
    } else {
      setFilteredList(pokemonList);
    }
  }, [searchTerm, pokemonList]);

  const addToTeam = (pokemon: Pokemon) => {
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
  
  return (
    <Container>
      <TeamSection>
        <h2>Meu Time</h2>
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
          ) : (
            filteredList.map((pokemon) => (
              <div key={pokemon.id} onClick={() => addToTeam(pokemon)}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </div>
            ))
          )}

      </PokemonSection>
    </Container>
  );
};

export default App;
