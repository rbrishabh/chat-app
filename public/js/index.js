var socket = io();
socket.on('connect', function () {
    console.log('Conected to server');
});
socket.on('disconnect', function () {
    console.log('Connection to server closed');
});
socket.on('newMessage', function (message) {
    console.log('new message recieved', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);

});

socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">Current Location</a>');
  li.text(`${message.from} : `);
  a.attr('href',message.url);
  li.append(a);
    jQuery('#messages').append(li);

});

jQuery("#message-form").on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(data){
        console.log(data);
    });
});

var locationButton = jQuery("#location-button");
locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert('Location not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(location){
        socket.emit('geoLocationMessage', {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
            });
    }, function(){
        alert('Unable to get location.');
    });
});