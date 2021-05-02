const express = require('express');

const lessonsRouter = require('../Routes/lessons-routes')
const messagesRouter = require('../Routes/messages-routes')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: "So far all is good, however, the tricky part is next."})
});

server.use('/api/lessons', lessonsRouter);
server.use('/api/messages', messagesRouter);


module.exports = server;