var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);  // so that node starts a new server and uses app for boilerplate
// so, whatever the app listens to, the server should also listen to
var io = require('socket.io')(http);  // io is kind of like the app variable
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

// var clientInfo = {
//     'some_socketiogenerated_key': {
//         name: 'Andrew',
//         room: 'LOTR'
//     }
// };

io.on('connection', function (socket) {  // a particular connection
    console.log('User connected via socket.io!');

    socket.on('disconnect', function () {
        var userData = clientInfo[socket.id];

        if (typeof userData !== 'undefined') {
            socket.leave(userData.room);
            io.to(userData.room).emit('message', {
                name: 'System',
                text: userData.name + ' has left!',
                timestamp: moment().valueOf()
            });
            delete clientInfo[socket.id];
        }
    });  // this name is defined in socket.io

    // use custom name, matching app
    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
            name: 'System',
            text: req.name + ' has joined!',
            timestamp: moment().valueOf()
        })
    });

    // have server listen for messages
    socket.on('message', function (message) {
        console.log('Message received: ' + message.text);

        message.timestamp = moment().valueOf();

        // io.emit, sends to everyone, including sender, so use
        // the following, which doesn't send to sender
        // socket.broadcast.emit('message', message);
        // io.emit('message', message);
        io.to(clientInfo[socket.id].room).emit('message', message);
    });

    // can have many events, e.g.
    socket.emit('message', {
        name: 'System',
        text: 'Welcome to the chat application!',
        timestamp: moment().valueOf()
    });
});  // listens for events

http.listen(PORT, function () {
    console.log('Server started!');
});

