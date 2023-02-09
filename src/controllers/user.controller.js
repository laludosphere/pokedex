import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export const getUserById = async (req, res) => {
    const {id} = req.params
    try {
        let user = await User.findByPk(id);

        if(!user){
            return res.status(404).json('user_not_found')
        }
        return res.status(200).json(user);        
    } catch (error) {
        return res.status(501).json(error)
    }
}

export const deleteUser = async (req, res) =>{
    try {
        const {id}=req.params
        const user = await User.findByPk(id);
        
        if(!user){
            return res.status(404).json({message: 'User Not Found'})
        }
        await user.destroy();
        const message = `Le user avec l'identifiant n°${user.email} a bien été supprimé.`
        res.json({message, data: user })     
        
    } catch (error) {
        const message = 'Le user n\'a pas pu être supprimé.'
        res.status(400).json({message, data: error});
    }
}

export const createUser = async (req, res ) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
          email: req.body.email,
          password: hashedPassword
        });
        res.status(201).send(user);
      } catch (error) {
        res.status(400).send(error);
      }
}

export const auth = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            return res.status(401).send({ message: 'Email ou mot de passe incorrect' });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: 'Email ou mot de passe incorrect' });
        }
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.send({ token });
        } catch (error) {
        res.status(500).send(error);
    }
}
