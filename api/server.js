const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const session = require('express-session');

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router');
const plantsRouter = require('./plants/plants-router');
const config = require('./config');

const server = express()

server.use(session({
  name: 'session_name',
  secret: config.JWT_SECRET,
  saveUninitialized: false,
  resave: false,
}))


server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/plants', plantsRouter);


module.exports = server
