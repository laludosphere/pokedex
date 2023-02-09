import Sequelize from 'sequelize';
import db from '../config/database.js'

const {DataTypes} = Sequelize;

const User = db.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    email: {
        type:DataTypes.STRING,
        unique: {
            msg: 'L\'email est déjà pris.'
        },
        isEmail: true,
        allowNull: false
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false
    }
})

export default User