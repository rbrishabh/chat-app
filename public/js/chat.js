var socket = io();
socket.on('connect', function () {
    console.log('Conected to server');
});
socket.on('disconnect', function () {
    console.log('Connection to server closed');
});

function scrollToBottom () {
//selectors
var messages = jQuery("#messages");
var lastMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var lastMessageHeight = lastMessage.innerHeight();
    var secondLastMessageHeight = lastMessage.prev().innerHeight();

    if(clientHeight + scrollTop + lastMessageHeight + secondLastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
};

socket.on('newMessage', function (message) {
    var time = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        time:time
    });
    jQuery("#messages").append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    var time = moment(message.createdAt).format("h:mm a");
var template = jQuery("#location-message-template").html();
var html = Mustache.render(template, {
   from:message.from,
   url:message.url,
   time:time
});
jQuery('#messages').append(html);
scrollToBottom();

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