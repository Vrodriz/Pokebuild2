import api from "./api";
import { Pokemon } from "../types/Pokemon";

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  try {
    const response = await api.get<{ results: { name: string; url: string }[] }>(
      `/pokemon?limit=151`
    );

    const pokemonList = response.data.results;

    const detailedPokemonList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const details = await api.get<Pokemon>(pokemon.url);
        return details.data;
      })
    );

    return detailedPokemonList;
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
    return [];
  }
};