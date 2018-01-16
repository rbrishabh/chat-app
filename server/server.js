const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io')
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New connection made');

    socket.on('disconnect', ()=>{
        console.log('Connection from client closed');
    });

    socket.emit('newMessage', {
        from : 'Lala',
        text: 'OK bye',
        createdAt: 123
    });
    socket.on('createMessage', function (message) {
        console.log('recieved new message', message);
    });

});

server.listen(PORT, ()=>{
    console.log(`Server up on ${PORT}`);
});