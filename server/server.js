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

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the RB chat',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined, say Hi!',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect', ()=>{
        console.log('Connection from client closed');
    });

    socket.on('createMessage', function (message) {
        console.log('recieved new message', message);
        io.emit('newMessage', {
         from: message.from,
         text: message.text,
         createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

});

server.listen(PORT, ()=>{
    console.log(`Server up on ${PORT}`);
});