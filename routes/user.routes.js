import {Router} from 'express';
const userRouter = Router();

//GET /users -> get all users
//GET /users/:id -> get user by id

userRouter.get('/',(req,res)=> res.send({title:'Fetch all users'}));

userRouter.get('/:id',(req,res)=>{
    res.send({title:'Get user details'});
});

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