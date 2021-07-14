import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import blogsRouter from './controllers/blogs'
import usersRouter from './controllers/users'

import config from './utils/config'
import logger from './utils/logger'

const app = express()

const url = config.MONGODB_URI

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((result) => {
        logger.info('Connect to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

export default app
