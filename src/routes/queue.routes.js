const Router = require('express').Router();
const Queue = require('../controllers/queue.controller');

Router.post('/queue', Queue.createQueue)
    .put('/queue', Queue.resetQueue)

module.exports = Router;