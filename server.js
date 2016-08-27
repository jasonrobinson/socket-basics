var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);  // so that node starts a new server and uses app for boilerplate
// so, whatever the app listens to, the server should also listen to
var io = require('socket.io')(http);  // io is kind of like the app variable

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {  // a particular connection
    console.log('User connected via socket.io!');

    // have server listen for messages
    socket.on('message', function (message) {
        console.log('Message received: ' + message.text);

        // io.emit, sends to everyone, including sender, so use
        // the following, which doesn't send to sender
        socket.broadcast.emit('message', message);
    })

    // can have many events, e.g.
    socket.emit('message', {
        text: 'Welcome to the chat application!'
    });
});  // listens for events

http.listen(PORT, function () {
    console.log('Server started!');
});