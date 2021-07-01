require('dotenv').config()

const { DB_URL } = process.env
const app = require('./app')
const port = 3000

const mongoose = require('mongoose')

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
  console.log('Connected to the database')

  app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
  })
})
