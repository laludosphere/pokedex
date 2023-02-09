import express from "express"

import {    
    getPokemons, 
    getPokemonById, 
    createPokemon,
    updatePokemon,
    deletePokemon
} from "../controllers/pokemon.controller.js"

const routerPokemon = express.Router();

routerPokemon.get('/api/pokemons', getPokemons);
routerPokemon.get('/api/pokemons/:id', getPokemonById);
routerPokemon.post('/api/pokemons', createPokemon);
routerPokemon.put('/api/pokemons/:id', updatePokemon)
routerPokemon.delete('/api/pokemons/:id', deletePokemon)

export default routerPokemon