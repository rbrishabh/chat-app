var socket = io();
socket.on('connect', function () {
    console.log('Conected to server');

    socket.emit('createMessage', {
        to: "lol",
        text: "oh yeah mausaji"
    });
});
socket.on('disconnect', function () {
    console.log('Connection to server closed');
});
socket.on('newMessage', function (message) {
    console.log('new message recieved', message);
});
