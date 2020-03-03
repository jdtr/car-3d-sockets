const { io } = require('../server');

io.on('connection', function (client) {
    console.log("Connection")

    client.on("coord", function (data, callback) {
        console.log(data)

        io.sockets.emit('moveCar', { data }); 

    });

});