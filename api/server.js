const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/authRouter');

// create server
const server = express();
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

// The request handler must be the first middleware on the app
server.use(Sentry.Handlers.requestHandler());
server.use(helmet());
server.use(express.json());
server.use(cors());

// first endpoint
server.get('/', (req, res) => {
  res.status(200).json({ server: 'server is up'});
});

server.use('/auth',authRouter);

// The error handler must be before any other error middleware and after all controllers
server.use(Sentry.Handlers.errorHandler());

module.exports = server;