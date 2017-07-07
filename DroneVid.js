var arDrone = require("ar-drone");
var client = arDrone.createClient();
//Parser = require("ar-drone/lib/video/PaVEParser")
//require('ar-drone-png-stream')(client, { port: 3000 });

var express = require("express");
var http = require("http");
var WebSocketServer = require("ws").Server;

//var videoStream = client.getVideoStream();
//videoStream.on("data", console.log);

client.config('general:navdata_demo', 'FALSE');

dataSockets = [];

app = express();

var server = http.createServer(app);

app.get("/",function(req,res){
	res.sendFile(__dirname+"/DroneVid.html");
});

app.get("/demo",function(req,res){
	demo();
	res.send({});
});

app.get("/jquery/jquery.min.js",function(req,res){
	res.sendFile(__dirname+"/node_modules/jquery/dist/jquery.min.js");
})

server.listen(2000, function(){
	console.log("Video Server Started");
});

wss = new WebSocketServer({server:server,port:3000});
wss.on('connection',function(ws){
	console.log("connection to data");
	dataSockets.push(ws);
	ws.on('close',function(){
		console.log("disconnection");
		dataSockets = dataSockets.filter(function (el) {
            return el !== ws;
        });
	});
});
client.on("navdata",function(data){
	dataSockets.forEach(function(socket){
		socket.send(JSON.stringify(data));
	});
});

require("dronestream").listen(server);

function demo(){
	console.log("demoing");
	printDelay();
	console.log(client.takeoff());
	printDelay();
	client.after(8000,function(){
		printDelay();
		console.log(client.front(.2));
		printDelay();
	}).after(2000,function(){
		printDelay();
		console.log(this.stop());
		printDelay();
	}).after(2000,function(){
		printDelay();
		console.log(this.land());
		printDelay();
	});
}
var newTime = -1;
function printDelay(){
	if(newTime==-1){
		newTime = new Date().getTime();
		return;
	}
	console.log(new Date().getTime()-newTime);
	newTime = new Date().getTime();
}

client.createRepl();
