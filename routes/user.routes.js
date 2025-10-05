import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import {getUser, getUsers} from "../controllers/user.controller.js";
const userRouter = Router();

//GET /users -> get all users
//GET /users/:id -> get user by id

userRouter.get('/', getUsers);

userRouter.get('/:id',authorize, getUser);

userRouter.post('/',(req,res)=>{
    res.send({title:'Create a user'});
});

userRouter.put('/:id',(req,res)=>{
    res.send({title:'Update the user'});
});

userRouter.delete('/:id',(req,res)=>{
    res.send({title:'Delete the user'});
});

export default userRouter;