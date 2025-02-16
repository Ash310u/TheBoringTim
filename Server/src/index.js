import express, { json } from 'express';
import cors from 'cors'
import "./db/mongoose.js"
import userRouter from './routers/user.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: true
}))

app.use(json());
app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});