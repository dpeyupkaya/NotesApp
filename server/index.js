import express from 'express'
import cors  from 'cors'
import connectToMongoDB from './db/db.js'

import authRouter from './routes/Auth.js'
import noteRouter from './routes/note.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/Auth', authRouter)
app.use('/api/note', noteRouter)

app.listen(5000,()=> {
    connectToMongoDB()
    console.log("Server is running")
})