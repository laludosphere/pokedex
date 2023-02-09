import Sequelize from 'sequelize';
import db from '../config/database.js'

const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée', 'Dragon', 'Combat', 'Acier', 'Glace', 'Psy', 'Roche', 'Sol', 'Spectre', 'Ténèbres']
const {DataTypes} = Sequelize

const Pokemon = db.define('Pokemon', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: { args: true, msg: "Name already exists" },
        allowNull: false,
        validate:{
            notEmpty: {msg: "Le nom ne peut pas etre vide."},
            notNull: {msg: "le nom est une propriété requise."}
        },
    },
    hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
            min: {
                args: [0],
                msg:" Les points de vie doivent être supérieurs ou égales à O"
            },
            max: {
                args: [100],
                msg:" Les points de vie doivent être inférieurs ou égales à 100"
            },
            notNull: { msg: 'Les points de vie sont une propiété requise.'}
        }
    },
    cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {msg: 'Utilisez uniquement des nombres entiers pour les points degats.'},
            min: {
                args: [0],
                msg:" Les points de vie doivent être supérieurs ou égales à O"
            },
            max: {
                args: [10],
                msg:" Les points de vie doivent être inférieurs ou égales à 10"
            },
            notNull: { msg: 'Les points de dégats sont une propiété requise.'}
        } 
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {msg: 'Utilisez uniquement une URL valide pour l\'image..'},
            notNull: { msg: 'L\'image est une propiété requise.'}
        } 
    },
    types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
            this.setDataValue('types', types.join())
        },
        validate: {
            isTypesValid(value){
                if(!value){
                    throw new Error('Un pokémon doit au moins avoir un type.')
                }
                if(value.split(',').length > 3){
                    throw new Error('Un pokémon ne peut pas avoir plus de trois types.')
                }
                value.split(',').map(type=>{
                    if(!validTypes.includes(type)){
                        throw new Error(`Le type d\'un pokemon doit appartenir à la liste suivante : ${validTypes}`)
                    }
                })
            }
        }
    }
    }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false 
    }
)

export default Pokemon