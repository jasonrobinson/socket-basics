var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);  // so that node starts a new server and uses app for boilerplate
// so, whatever the app listens to, the server should also listen to
var io = require('socket.io')(http);  // io is kind of like the app variable

app.use(express.static(__dirname + '/public'));

io.on('connection', function () {
    console.log('User connected via socket.io!');
});  // listens for events

http.listen(PORT, function () {
    console.log('Server started!');
});