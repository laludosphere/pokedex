import express from "express"

import {    
    
    getUserById,
    deleteUser,
    auth,
    createUser
} from "../controllers/user.controller.js"

const routerUser = express.Router();

routerUser.get('/api/users/:id', getUserById)
routerUser.delete('/api/users/:id', deleteUser);
routerUser.post('/api/users/login', auth);
routerUser.post('/api/users/signup', createUser);

export default routerUser