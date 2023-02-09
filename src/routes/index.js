import express from "express"
import routerPokemon from "./pokemon.route.js"
import routerUser from "./user.route.js"


const router = express.Router();

router.use(routerUser);
router.use(routerPokemon);


export default router