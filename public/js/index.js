var socket = io();
socket.on('connect', function () {
    console.log('Conected to server');
});
socket.on('disconnect', function () {
    console.log('Connection to server closed');
});
socket.on('newMessage', function (message) {
    var time = moment(message.createdAt).format("h:mm a");
    var li = jQuery('<li></li>');
    li.text(`${message.from} at ${time} : ${message.text}`);
    jQuery('#messages').append(li);

});

socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
    var time = moment(message.createdAt).format("h:mm a");
    var a = jQuery('<a target="_blank">Current Location</a>');

  a.attr('href',message.url);
  li.append(a);
    jQuery('#messages').append(li);

});

jQuery("#message-form").on('submit', function(e) {
    e.preventDefault();
var messageInput = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageInput.val()
    }, function(){
        messageInput.val('');
    });
});

var locationButton = jQuery("#location-button");
locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert('Location not supported by your browser.');
    }
locationButton.attr('disabled', 'disabled').text('Sending Location..');
    navigator.geolocation.getCurrentPosition(function(location){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('geoLocationMessage', {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
            });
    }, function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to get location.');
    });
});