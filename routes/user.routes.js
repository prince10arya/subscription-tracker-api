import {Router} from 'express'
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js'
const userRouter = Router();

userRouter.get('/',getUsers);

userRouter.get('/:id',authorize ,getUser);

userRouter.put('/',(req, res) => {
    res.send({title: 'POST(CREATE) new user'});
});

userRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    res.send({ title: `UPDATE user ${id}`})
});

userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send({ title: `DELETE user ${id}`})
});

export default userRouter;

