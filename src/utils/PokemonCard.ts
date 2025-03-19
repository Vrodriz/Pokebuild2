import axios from "axios";
import { Pokemon } from "../types/Pokemon";

export const fetchPokemonList = async (): Promise<Pokemon[]> => {   
    try {
        const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');

        const pokemonDetails = await Promise.all(   
            data.results.map(async(pokemon: {url: string}) => { 
                const {data} = await axios.get(pokemon.url);
                return data;
            })
        );

        return pokemonDetails;
    } catch (error) {
        console.log('Erro ao buscar o Pokemon:', error);
        throw error;
    }
};