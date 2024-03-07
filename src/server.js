import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from '../src/routes/index.js';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(bodyParser.json());

// Configure CORS with custom options
app.use(cors({
  origin: 'http://127.0.0.1:5500', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use("/", router);

const port = process.env.PORT;
const database = process.env.DATABASE;

// ------config port --------

app.listen(port, () => {
  console.log(`port running on ${port}`);
});

mongoose.connect(database).then(() => {
  console.log(`database connection successfully`);
});

export default app;
