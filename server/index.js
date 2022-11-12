import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import postRoutes from './routes/posts.js'

const app = express()

app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))

app.use(cors())

app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5000

// Listening to port 5000
app.listen(PORT, ()=> console.log(`Server running at PORT: ${PORT}`))

// Connecting to mongoDB dataBase
mongoose.connect(process.env.LOCAL_CONNECTION)
    .then(()=>{
        console.log("Connected to mongoDB database");
    })
    .catch((error)=> console.log(error))
