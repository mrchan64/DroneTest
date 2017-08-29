var Stream = require('stream');
var Readable = Stream.Readable;
//var through = require('through')

var rstream = Readable();
rstream._read = function(){
	//console.log('reading', arguments);
}

rstream.on('data', function(data){
	console.log(data)
	if(data.fsenwn)console.log(data.fsenwn)
})
rstream.on('bloop', function(data){
	console.log(data);
})
rstream.on('end', function(){
	console.log('ending')
})
var msg = {
	'hi':3,
	'fsenwn':'yo'
}
rstream.emit('data', 'hi');
rstream.emit('data', 'bye');
rstream.emit('bloop', 'yoooooo')
rstream.emit('data', msg)
rstream.emit('end');
this.hi = 'yye'
exports.poop = function(){
	console.log('yayyyyy');
}
//console.log(this);
setTimeout(function(){this.poop()}.bind(exports),1000)