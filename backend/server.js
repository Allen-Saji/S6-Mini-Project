const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
require('colors')
//const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin:"http://localhost:5173"
}))



// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  } else {
    app.get('/', (_, res) => {
      res.status(200).json({ message: 'Welcome to the University Registry API' })
    })
  }

//app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))
