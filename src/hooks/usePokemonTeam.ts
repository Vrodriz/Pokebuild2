import { useState, useCallback } from "react";
import { Pokemon } from "../types/Pokemon";
import { toast } from "sonner";

const usePokemonTeam = () => {
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(6).fill(null));

  const addToTeam = useCallback((pokemon: Pokemon) => {
    setTeam((prevTeam) => {
      if (prevTeam.some((p) => p?.id === pokemon.id)) {
        toast.error(`${pokemon.name} já está no time!`);
        return prevTeam;
      }

      const newTeam = [...prevTeam];
      const emptySlot = newTeam.findIndex((p) => p === null);
      if (emptySlot !== -1) {
        newTeam[emptySlot] = pokemon;
        toast.success(`${pokemon.name} foi adicionado ao time!`);
      } else {
        toast.error("Time completo!");
      }
      return newTeam;
    });
  }, []);

  const removeFromTeam = useCallback((index: number) => {
    setTeam((prevTeam) => {
      const newTeam = [...prevTeam];
      if (newTeam[index]) {
        toast.info(`${newTeam[index]?.name} foi removido.`);
        newTeam[index] = null;
      }
      return newTeam;
    });
  }, []);

  const randomizeTeam = useCallback((pokemonList: Pokemon[]) => {
    const shuffled = [...pokemonList].sort(() => 0.5 - Math.random());
    const randomTeam = shuffled.slice(0, 6);
    setTeam(randomTeam);
    toast.success("Time aleatório gerado!");
  }, []);
  

  const clearTeam = useCallback(() => {
    setTeam(Array(6).fill(null));
    toast.info("Todos os Pokémon foram removidos do time.");
  }, []);

  return { team, addToTeam, removeFromTeam, randomizeTeam, clearTeam };
};

export default usePokemonTeam;
