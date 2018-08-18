var socket = io();
var converter = new showdown.Converter()

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

fitty('#left', {
    minSize: 60,
    maxSize: 280
});

function change(){
  document.getElementById("left").innerHTML = converter.makeHtml(document.getElementById("input").value);
  socket.emit('update', converter.makeHtml(document.getElementById("input").value));
}

socket.on('recUpdate', function(msg){
  if(window.location.pathname==="/"){
    console.log(msg)
    document.getElementById("left").innerHTML = msg;
  }
});

socket.on('emoji', function(msg){
  document.getElementById(msg.element).style.backgroundColor = msg.color;
});

socket.on('connectt', function(msg){
  document.body.style.backgroundColor = getRandomColor();
  var z = document.title;
  document.title += " +1"
  setInterval(function(){document.body.style.backgroundColor = "white"; document.title = z}, 300)
});

//socket.on('message', function(data){document.write(data)});