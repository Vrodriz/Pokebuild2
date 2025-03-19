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

  return (
    <Container>
      <TeamSection>
        <h2>Meu Time</h2>
      </TeamSection>
      <PokemonSection>
        <h2>Pokémon Disponíveis</h2>
      </PokemonSection>
    </Container>
  );
};

export default App;
