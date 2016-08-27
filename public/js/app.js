// on the front end
var socket = io();

// monitor w/dev tools
socket.on('connect', function (){
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
    var momentTimestamp = moment.utc(message.timestamp);
    console.log('New message: ');
    console.log(momentTimestamp + ': ' + message.text);

    // target by class, use . (id uses #, tag name uses tag name, e.g. input...)
    jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>'); // adds content into existing markup areas
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
