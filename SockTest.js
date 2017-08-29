var sockjs = require("sockjs");
var http = require("http");
var express = require("express");

var app = express();

app.get("/",function(req,res){
	res.sendFile(__dirname+"/SockTest.html");
});

var server = http.createServer(app);

server.listen(3002, function(){
	console.log("Test Server Started");
});

var stream = sockjs.createServer();
stream.installHandlers(server, {prefix: '/test'});
var conns = [];
stream.on('connection', function(conn){
	conns.push(conn);
	conn.on('close', function(){
		conns.splice(conns.indexOf(conn),1);
	});
});

setInterval(function(){
	for(var i = 0; i<conns.length; i++){
		var msg = {
			'hi': 'omggggg'
		};
		conns[i].write(JSON.stringify(msg))
	}
}, 500)