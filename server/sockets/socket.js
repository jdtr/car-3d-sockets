const { io } = require('../server');

io.on('connection', function (client) {
    console.log("Connection")

    let coord;

    client.on("coord", function (data, callback) {
        console.log(data)

        io.sockets.emit('moveCar', { data }); 

    });

});