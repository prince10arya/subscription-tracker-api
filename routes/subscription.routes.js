import authorize from '../middlewares/auth.middleware.js'
import {createSubscription, getUserSubscriptions} from '../controllers/subscription.controller.js'
import {Router} from 'express'
const subsRouter = Router();


subsRouter.get('/',(req, res) => {
    res.send({ title: 'GET all subscriptions' });
});

subsRouter.get('/:id',(req, res) => {
    res.send({ title: 'GET subscriptions details' });
});
  
subsRouter.post('/',authorize, createSubscription);

subsRouter.put('/:id',(req, res) => {
    res.send({ title: 'UPDATE a subscriptions' });
});

subsRouter.delete('/:id',(req, res) => {
    res.send({ title: 'DELETE a subscriptions' });
});

subsRouter.get('/users/:id',authorize, getUserSubscriptions);
subsRouter.put('/:id/cancel',(req, res) => {
    res.send({ title: 'CANCEL subscription' });
});
subsRouter.get('/upcoming-renewals',(req, res) => {
    res.send({ title: 'GET upcoming renewals' });
});


export default subsRouter