const { IO } = require('../server');

IO.on('connection', function (client) {
    console.log("Connection")

    client.emit('moveCar', { message: "backend connection" });

    client.on("coord", function (data) {
        console.log(data)
    });
});