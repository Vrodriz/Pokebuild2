import api from "./api";
import { Pokemon } from "../types/Pokemon";


export const fetchPokemonList = async (): Promise<{ name: string; url: string }[]> => {
  try {
    const response = await api.get<{ results: { name: string; url: string }[] }>("/pokemon?limit=151");
    return response.data.results; 
  } catch (error) {
    console.error("Erro ao buscar a lista de Pokémons", error);
    return [];
  }
};


export const fetchPokemonDetails = async (pokemonList: { name: string; url: string }[]): Promise<Pokemon[]> => {
  try {
    const details = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const response = await api.get<Pokemon>(pokemon.url);
        return response.data;
      })
    );
    return details;
  } catch (error) {
    console.error("Erro ao buscar detalhes dos Pokémons:", error);
    return [];
  }
};
