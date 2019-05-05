var colors = require('colors');
module.exports = function (server,socket,dbRequest, dbconn ) {
var sockettracker = new Map();

let io = socket(server);

io.on('connection', function(socket){
	console.log(colors.cyan("------socket connected : "+socket.id));

	
	socket.on('disconnect', function() {
		
		console.log(colors.cyan("socket disconnected : "+socket.id));
	});


	socket.on('fe_startgame', function(data){
		 
		console.log(colors.cyan("socket event serverside : fe_startgame -> " ));
		io.emit('be_startgame', '');

    
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

	socket.on('fe_setDeck', function(data){
		console.log(colors.cyan("socket event serverside : fe_setDeck -> " ));
		io.emit('be_setDeck', '');
    
	});

  	//message part
	socket.on('send message', function(data){
	
		io.emit('relay message', data);
    
	});

});


}