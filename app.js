import express from 'express'
import { PORT } from './config/env.js'
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subsRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongoose.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookParser from 'cookie-parser'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import workflowRouter from './routes/workflow.routes.js'

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(cookParser());

app.use(arcjetMiddleware);

app.use(errorMiddleware); 

app.use('/api/v1/auths',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subsRouter);
app.use('/api/v1/workflows',workflowRouter);




app.listen(PORT, async () => {
    console.log(`Listening on  http://localhost:${PORT}`);
    await connectToDatabase();
})