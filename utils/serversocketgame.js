var colors = require('colors');
module.exports = function (server,socket,dbRequest, dbconn ) {
var sockettracker = new Map();

let io = socket(server);

io.on('connection', function(socket){
	console.log(colors.cyan("------socket connected : "+socket.id));

	
	socket.on('disconnect', function() {
		
		console.log(colors.cyan("---------socket disconnected : "+socket.id));
	});

	socket.on('fe_setEnvForSocket', function(data){
		let gamesessionid = null;
      	dbRequest.getGameTableSession(dbconn, data, function (result) {

          if (typeof result.code !== "undefined" || result === "") {
           	
          } else {
          	console.log(colors.cyan("colecting db record : fe_setEnvForSocket"+ JSON.stringify(result)));
          	let tempdata = result;
          	let tempdatalength = tempdata.length;
          	
          	if (tempdatalength > 1){
          		console.log(colors.red("error : there are multiple times same table in play !!!!!!"));
          	}else if (tempdatalength === 1) {
	          	
	          		console.log(colors.cyan("game session :" +tempdata[tempdatalength-1].id));
	          		data.gamesessionid = tempdata[tempdatalength-1].id;
	          		socket.join(data.gamesessionid);
	          		data.socketroom = tempdata[tempdatalength-1].id;
	          		data.userturn = parseInt(tempdata[tempdatalength-1].userturn);
	          		data.thissocketid = socket.id;
	          		if (!( data.usersinsocketroom.includes(parseInt(data.thisuser)) )){
	          			data.usersinsocketroom.push(parseInt(data.thisuser));
	          		}
	          		if (!( data.socketids.includes((socket.id)) )){
	          			data.socketids.push((socket.id));
	          		}

	          		console.log(colors.cyan("data ---> serverside fe_setEnvForSocket :" + JSON.stringify(data)));
	          		io.to(data.socketroom).emit('be_setEnvForSocket',data);
	          	
          	}
          }
	    });	

   
	});

	socket.on('fe_startgame', function(data){
		 
		console.log(colors.cyan("socket event serverside : fe_startgame -> " ));
		io.emit('be_startgame', '');

    
	});

	socket.on('socketUserAuthInfo', function(usersession){
		user = {};
		user = JSON.parse(usersession); 
		console.log(colors.cyan("socket event serverside : socketUserAuthInfo -> " + (user.userid)));
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