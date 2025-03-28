import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails, fetchPokemonList } from "../services/fetchPokemonList";
import { Pokemon } from "../types/Pokemon";


const usePokemonQuery = () => {
  return useQuery<Pokemon[]>({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const list = await fetchPokemonList();
      return fetchPokemonDetails(list);
    },
  });
};

export default usePokemonQuery;
