const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const auth = require('../auth/authRouter')
const issuesRouter = require('../issues/issuesRouter')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/api/auth', auth)
server.use('/api/issues', issuesRouter)

server.get('/', (req, res) => {
    res.status(200).json({api: 'le up'})
})

module.exports = server