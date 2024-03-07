import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './routes/index';
import cors from 'cors'

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json())
app.use("/api/v1",router)


const port = process.env.PORT
const database = process.env.DATABASE

// ------config port --------

app.listen(port,()=>{
    console.log(`port running on ${port}`)
})

mongoose.connect(database) .then(()=>{
    console.log(`database connection successfully`)
})

export default app