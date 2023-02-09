import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import favicon from 'serve-favicon'
import path from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import { connect } from './src/config/database.js';
import {syncModels} from './src/config/sync.js'
import router from "./src/routes/index.js"




const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app
.use(cors())
.use(favicon(__dirname + '/src/public/images/Pokeball.png'))
.use(morgan('dev'))
.use(bodyParser.json())


// await sequelize.initDb()
await connect();
await syncModels();

//use router
app.use(router)

//Listen on port
app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

//TODO ajouter des validateurs sequelize et ameliorer le controller du pokemon
 