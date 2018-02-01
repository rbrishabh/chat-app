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
        console.log('recieved new message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });




socket.on('disconnect', ()=>{
    var user = users.removeUser(socket.id);
io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
if(user) {
    io.to(user.room).emit('updateUsersList', users.getUsersList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
}

});




    socket.on('geoLocationMessage', (coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude));
});


});



server.listen(PORT, ()=>{
    console.log(`Server up on ${PORT}`);
});