var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/login', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

io.on('connection', function(socket){
	// 监听客户端发送的 chat 事件
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('sduser disconnected');
	});
	socket.on('chat message', function(msg){
		// 向除了当前 socket 外的所有 socket 发送聊天信息
		console.log(msg.username + "发送了" + msg.message)
    io.emit('chat message', msg);
    socket.broadcast.emit('user connected');
  });
});

http.listen(3000, function() {
	console.log('App listening on port 3000!');
});