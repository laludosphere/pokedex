import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASS
const host = process.env.DB_HOST || "localhost"
const dialect = process.env.DB_DIALECT || "mariadb"
// create connection
const db = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

//test db connection
export const connect = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
   
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
} 

 
// export connection
export default db;
