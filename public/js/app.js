// on the front end
var socket = io();

// monitor w/dev tools
socket.on('connect', function (){
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
    console.log('New message:');
    console.log(message.text);
});

// Handles submitting new message
var $form = jQuery('#message-form');  // title, form, etc.; here selecting #id
// $ means var stores a jquery instance

$form.on('submit', function (event) {
    event.preventDefault();  // to handle submission

    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        text: $message.val()  // gets as a string
    });

    // $('#message-form').children('input').val('');
    // $('#message-form')[0].reset();
    $message.val('');    
});
