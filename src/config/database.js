import { Sequelize } from "sequelize";

// create connection
const db = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
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
