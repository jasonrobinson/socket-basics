var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);  // so that node starts a new server and uses app for boilerplate
// so, whatever the app listens to, the server should also listen to

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function () {
    console.log('Server started!');
});