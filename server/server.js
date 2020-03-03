// Server
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const http = require('http');

let server = http.createServer(app);

const IO = require('socket.io')(server);
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });

// Static
app.use('/', express.static(path.resolve(__dirname, '../public')))
app.use("/", express.static(path.join(__dirname, '../node_modules')));

module.exports = { IO };

require('./sockets/socket');


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
