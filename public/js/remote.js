const socket = io();

//Events
document.getElementById('control').addEventListener('mousemove', function (e) {
    socket.emit('coord', { x: e.clientX, y: e.clientY }, function (data) {
        console.log(data)
    });
});