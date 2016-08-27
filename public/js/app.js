// on the front end
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + " wants to join " + room + "!");

// monitor w/dev tools
socket.on('connect', function (){
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $message = jQuery('.messages');

    console.log('New message: ');
    // console.log(momentTimestamp + ': ' + message.text);
    console.log(message.text);

    $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
    // target by class, use . (id uses #, tag name uses tag name, e.g. input...)
    // jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>'); // adds content into existing markup areas
});

// Handles submitting new message
var $form = jQuery('#message-form');  // title, form, etc.; here selecting #id
// $ means var stores a jquery instance

$form.on('submit', function (event) {
    event.preventDefault();  // to handle submission

    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: $message.val()  // gets as a string
    });

    // $('#message-form').children('input').val('');
    // $('#message-form')[0].reset();
    $message.val('');    
});

