var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
   res.sendfile('views/index.html');
});

app.get('/cast', function(req, res) {
   res.sendfile('views/cast.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');
  io.emit("connectt", "connected")
   setTimeout(function() {
      socket.send('Sent a message 4seconds after connection!');
   }, 4000);
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
     
   });
  socket.on('update', function(msg){
    console.log(msg)
    io.emit("recUpdate", msg)
  });
  socket.on('emoji', function(msg){
    console.log(msg)
    io.emit("emoji", msg)
  });

});

http.listen(3000, function() {
   console.log('listening on *:3000');
});