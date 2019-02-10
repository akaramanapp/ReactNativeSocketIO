var express = require('express');
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server);
var fs = require('fs');



app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log(socket.id);
    socket.on('update', (data) => io.emit('update', {data}));
});

server.listen(3000);