var arDrone = require("ar-drone");
var client = arDrone.createClient();

/*client.on("navdata",function(data){
	console.log(data);
})*/

client.takeoff();
console.log("up");

client.after(4000,function(){
	client.front(.2);
}).after(1000,function(){
	this.stop();
}).after(2000,function(){
	this.land();
});

//client.createRepl()