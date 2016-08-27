// on the front end
var socket = io();

socket.on('connect', function (){
    console.log('Connected to socket.io server!');
});
