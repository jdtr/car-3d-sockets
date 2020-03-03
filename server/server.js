// Server
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const http = require('http');
const socketIO = require('socket.io');

let server = http.createServer(app);

// Static
app.use(express.static(path.resolve(__dirname, '../public')));


// Sockets
module.exports.io = socketIO(server);

require('./sockets/socket');

// Run server
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});