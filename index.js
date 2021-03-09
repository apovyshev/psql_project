const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/persons', db.getUsers)
app.get('/persons/:id', db.getUserById)
app.post('/persons', db.createUser)
app.put('/persons/:id', db.updateUser)
app.delete('/persons/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})