import Pokemon from "../models/pokemon.js"
import { UniqueConstraintError, ValidationError, Op } from "sequelize";



export const getPokemons = async(req, res) => {
    try {
        if(req.query.name){
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if(name.length < 2){
                const message = `Le terme de recherche doit contenir au moins 2 caractères.`
                return res.status(400).json({message})
            }
            
            const pokemons = await Pokemon.findAndCountAll({
                where: { 
                    name: {
                        [Op.like]: `%${name}%` //'name' est le critère de la recherche 
                    }
                },
                order: ['name'],
                limit: limit 
            })

            const message = `Il y a ${pokemons.count} pokémons qui correspondent au terme de recherche ${name}.`
            res.json({message, data: pokemons.rows})
            return 
        }
        const pokemons = await Pokemon.findAll({order: ['name']});
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({message, data: pokemons});
    } catch (error) {
        const message = 'La liste pokémon n\'a pas pu être récupérée.'
        res.status(400).json({message, data: error});
    }
}

export const getPokemonById = async (req, res) => {
    try {
        const pokemon = await Pokemon.findByPk(req.params.id);
        if(!pokemon){
            return res.status(404).json({message: 'Pokemon Not Found'})
        }
        const message = 'Un pokémon a bien été trouvé.';
        res.json({message, data: pokemon});  
    } catch (error) {
        res.status(404).json({data:error})
    }
}

export const createPokemon =  async (req, res) => {
    try {
        const pokemon = await Pokemon.create(req.body);
        const message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.status(201).json({message, data: pokemon})
    } catch (error) {
        if(error instanceof ValidationError){
            return res.status(400).json({ message: error.message, data:error })
        }
        if(error instanceof UniqueConstraintError){
            return res.status(400).json({message: error.message, data: error })
        }
        const message = 'Le Pokémon n\'a pas pu etre crée.'
        res.status(500).json({message, data: error})
    }
}

export const updatePokemon = async (req, res) => {
    try {
        const id = req.params.id
        const pokemon = await Pokemon.findByPk(id);
        if(!pokemon){
            return res.status(404).json({message: 'Pokemon Not Found'})
        }
        await pokemon.update(req.body)
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
    } catch (error) {
        if(error instanceof ValidationError){
            return res.status(400).json({ message: error.message, data:error })
        }
        if(error instanceof UniqueConstraintError){
            return res.status(400).json({message: error.message, data: error })
        }
        const message = 'Le Pokémon n\'a pas pu etre modifié.'
        res.status(500).json({message, data: error})
    }
}

export const deletePokemon = async (req, res) => {
    try {
        const id = req.params.id
        const pokemon = await Pokemon.findByPk(id);
        if(!pokemon){
            return res.status(404).json({message: 'Pokemon Not Found'})
        }
        await pokemon.destroy();
        const message = `Le pokémon avec l'identifiant n°${pokemon.id} a bien été supprimé.`
        res.json({message, data: pokemon })     
    } catch (error) {
        const message = 'Le pokémon n\'a pas pu être supprimé.'
        res.status(400).json({message, data: error});
    }
}

