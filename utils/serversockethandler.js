var colors = require('colors');
module.exports = function (server,socket,dbRequest, dbconn ) {

let io = socket(server);

io.on('connection', function(socket){
	
	socket.on('connect', function() { 
		console.log("socket connected : "+socket.id);
	});
	
	socket.on('disconnect', function() {
		
		console.log("socket disconnected : "+socket.id);
	});

	socket.on('socketUserAuthInfo', function(usersession){
		console.log(colors.cyan("socket event : socketUserAuthInfo -> " + JSON.stringify(usersession)));

    
	});

  	//message part
	socket.on('send message', function(data){
	
		io.sockets.emit('relay message', data);
    
	});

});


}