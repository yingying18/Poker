var colors = require('colors');
module.exports = function (server,socket,dbRequest, dbconn ) {
var sockettracker = new Map();

let io = socket(server);

io.on('connection', function(socket){
	
	socket.on('connect', function() { 
		console.log("socket connected : "+socket.id);
	});
	
	socket.on('disconnect', function() {
		
		console.log("socket disconnected : "+socket.id);
	});

	socket.on('socketUserAuthInfo', function(usersession){
		user = {};
		user = JSON.parse(usersession); 
		console.log(colors.cyan("socket event : socketUserAuthInfo -> " + (user.userid)));
		sockettracker.set(user.userid, socket.id);

		for (var value of sockettracker.values()) {
  			console.log(colors.cyan("socket lists : al socket ids -> " + value));
		}

    
	});

  	//message part
	socket.on('send message', function(data){
	
		io.sockets.emit('relay message', data);
    
	});

});


}