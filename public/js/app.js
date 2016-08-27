// on the front end
var socket = io();

// monitor w/dev tools
socket.on('connect', function (){
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
    console.log('New message:');
    console.log(message.text);
})
