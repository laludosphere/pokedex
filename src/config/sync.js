import User from '../models/user.js'
import Pokemon from '../models/pokemon.js'
import pokemons from '../config/mock-pokemon.js'



export const syncModels = async () => {
    try {
        await User.sync({force: true})
        
        const user = await User.create({
            email:"pikachu@gmail.com",
            password: "123"
        })
        console.log('User created', user.toJSON());
        await Pokemon.sync({force:true})
        pokemons.map(async pokemon => {
            await Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            })
            // console.log(pokemon)
        })
        
        
    } catch (error) {
        console.error('Error while syncing model', error)
    }
}