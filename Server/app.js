const express = require('express')
const dotenv = require('dotenv')
const accessConfig = require('./config/accessConfig')
const app = express()
const server = require('http').createServer(app)
dotenv.config({path: './config/config.env'})
app.use(accessConfig)

const entities = require('./routes/entities')

app.use('/api/v1/entities', entities)

const port = process.env.PORT || 3010
server.listen(port, () => console.log(`Server listening on port: ${port}...`))