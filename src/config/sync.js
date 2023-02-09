import User from '../models/user.js'
import Pokemon from '../models/pokemon.js'
import pokemons from '../config/mock-pokemon.js'



export const syncModels = async () => {
    try {
        await User.sync()
        await Pokemon.sync()
        console.log('ok')
        await Pokemon.bulkCreate(pokemons.map(pokemon => ({
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types
        })))        
    } catch (error) {
        console.error('Error while syncing model', error)
    }
}