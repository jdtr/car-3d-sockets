const socket = io();

//Events
document.getElementById('control').addEventListener('touchstart', function (e) {
    socket.emit('coord', { x: e.touches[0].clientX, y: e.touches[0].clientY }, function (data) {
        console.log(data)
    });
});



document.getElementById('control').addEventListener('touchend', function (e) {
    socket.emit('coord', { x: e.touches[0].clientX, y: e.touches[0].clientY }, function (data) {
        console.log(data)
    });
});