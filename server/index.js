import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()

app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))

app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

const hostname = '0.0.0.0'
const PORT = process.env.PORT || 5000

app.get('/', (req, res)=>{
    res.send('APP IS RUNNING...')
})

// Listening to port 5000
app.listen(PORT, hostname, ()=> console.log(`Server running at http://${hostname}:${PORT}`))

// Connecting to mongoDB dataBase
mongoose.connect(process.env.CONNECTION_URL)
    .then(()=>{
        console.log("Connected to mongoDB database");
    })
    .catch((error)=> console.log(error))
