const path = require('path');
const http = require('http');
const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io')
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New connection made');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the RB chat'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Welcome new user'));

    socket.on('disconnect', ()=>{
        console.log('Connection from client closed');
    });

    socket.on('createMessage', function (message, callback) {
        console.log('recieved new message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

socket.on('geoLocationMessage', (coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude));
});


});



server.listen(PORT, ()=>{
    console.log(`Server up on ${PORT}`);
});