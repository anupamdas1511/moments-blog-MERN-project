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

const CONNECTION_URL = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.d9torx8.mongodb.net/?retryWrites=true&w=majority`

const LOCAL_CONNECTION = `mongodb://localhost:27017`

const PORT = process.env.PORT || 5000

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(LOCAL_CONNECTION)
    .then(()=>{
        app.listen(PORT, ()=> console.log(`Server running at PORT: ${PORT}`))
    })
    .catch((error)=> console.log(error))

// mongoose.set('useFindAndModify', false)