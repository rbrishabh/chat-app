const path = require('path');
const http = require('http');
const express = require('express');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io')
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
var users = new Users;
io.on('connection', (socket)=>{
    console.log('New connection made');




    socket.on('join', (params, callback)=>{
     if(!isRealString(params.name) || !isRealString(params.room)){
        return callback('Name and Room are required fields.');
}
socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id, params.name, params.room);

io.to(params.room).emit('updateUSersList', users.getUsersList(params.room));

   socket.emit('newMessage', generateMessage('Admin','Welcome to the RB chat'));
   socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the chat room.`));
callback();
    });

    socket.on('createMessage', function (message, callback) {
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user[0].room).emit('newMessage', generateMessage(user[0].name, message.text));
        }
        callback();

    });

socket.on('geoLocationMessage', (coords)=>{

   var user = users.getUser(socket.id);
   if(user){
       io.to(user[0].room).emit('newLocationMessage',generateLocationMessage(user[0].name, coords.latitude, coords.longitude));

   }

});


socket.on('disconnect', ()=>{
    var user = users.removeUser(socket.id);
if(user) {
    io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
}

});

});



server.listen(PORT, ()=>{
    console.log(`Server up on ${PORT}`);
});