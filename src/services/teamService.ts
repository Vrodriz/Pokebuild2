import { Pokemon } from '../types/Pokemon';

export const addToTeam = (team: (Pokemon | null)[], pokemon: Pokemon) => {
    if (team.includes(pokemon)) {
      return { team, message: `${pokemon.name} já está no time!` };
    }
  
    if (team.filter(p => p !== null).length >= 6) {
      return { team, message: 'Time completo!' };
    }
  
    const newTeam = [...team];
    const emptySlot = newTeam.indexOf(null);
    newTeam[emptySlot] = pokemon;
  
    return { team: newTeam, message: `${pokemon.name} foi adicionado ao time!` };
  };
  

export const removeFromTeam = (team: (Pokemon | null)[], index: number) => {
  const newTeam = [...team];
  const removedPokemon = newTeam[index];
  newTeam[index] = null;

  return { team: newTeam, message: removedPokemon ? `${removedPokemon.name} foi removido.` : '' };
};
