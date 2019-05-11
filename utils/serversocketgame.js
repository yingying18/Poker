var colors = require('colors');
module.exports = function (server,socket,dbRequest, dbconn ) {

var sockettracker = new Map();
var roomsinterval = new Map();
var rooms = [];

let io = socket(server);

	io.on('connection', function(socket){
		console.log(colors.cyan("------socket connected : "+socket.id));

		
		socket.on('disconnect', function() {
			
			console.log(colors.cyan("---------socket disconnected : "+socket.id));
		});

		socket.on('fe_setEnvForSocket', function(data){
			console.log(colors.red("on loby enter" + JSON.stringify(data)));
			/*data : {"thisuser":168,"thissocketid":"","thiscards":[],"thisseatno":0,"thisbet":0,
			"seatstaken":[],"users":[],"deck":[],"gamesessionid":0,"housecards":[],"usercards":[],
			"socketroom":0,"socketids":[],"gamestatus":"","userstatus":"","gamecycle":0,
			"userturn":0,"tableid":null,"usersinsocketroom":[],"tablemoney":0,"timer":5}
			*/
			let gamesessionid = null;
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+JSON.stringify(data));
	      	dbRequest.getGameTableSession(dbconn, data, function (result) {
	      		// [{"id":45,"table_id":1,"state":"waiting","userturn":168,"usercyclestarter":168,"totalbet":0,"cycle":1,"maxcycle":1}]

	          if (typeof result.code !== "undefined" || result === "") {
	           		throw new Error('error : fe_setEnvForSocket :getGameTableSession() -> result is empty or undefined');
	          } else {
	          	console.log(colors.blue(JSON.stringify(result)));
	          	
	          	let tempdata = result;
	          	let tempdatalength = tempdata.length;
	          	
	          	if (tempdatalength <=0 ){
	          		console.log(colors.red("error : tempdatalength < 0"));
	          	}else {
		          	
		          		
		          		data.gamesessionid = tempdata[0].id;
		          		socket.join(data.gamesessionid);
		          		data.socketroom = tempdata[0].id;
		          		data.userturn = parseInt(tempdata[0].userturn);
		          		data.thissocketid = socket.id;
	          			data.socketids[data.thisuser] = socket.id;
	          			data.thistimer = tempdata[0].timer;
	          			data.cycle = tempdata[0].cycle;
	          			data.maxcycle =tempdata[0].maxcycle;
		          		

		          		


		          		      	dbRequest.get52Cards(dbconn, null, function (result) {
						      		
							          if (typeof result.code !== "undefined" || result === "") {
							           		throw new Error('fe_setEnvForSocket : get52Cards() -> result is empty or undefined');
							          } else {
							          	
								          	let tempdata = result;
								          	let tempdatalength = tempdata.length;
								          	for (let i = 0 ; i <tempdatalength ; i++){
								          		data.deck.push(tempdata[i].id);
									          		
								          	}
						          			
							          		
					          				dbRequest.getGameUserSessionForTable(dbconn, data, function (result) {
			      		
										          if (typeof result.code !== "undefined" || result === "") {
										           		throw new Error('fe_setEnvForSocket : getGameUserSessionForTable() -> result is empty or undefined');
										          } else {
										          	console.log(colors.cyan("colecting db record : fe_setEnvForSocket : getGameUserSessionForTable() "+ JSON.stringify(result)));
										          	let tempdata = result;
										          	let tempdatalength = tempdata.length;
										          	for (let i = 0 ; i <tempdatalength ; i++){
										          			if (!(data.users.includes(tempdata[i].id ))) {
										          				data.users.push(tempdata[i].id );
										          			}
										          			if (tempdata[i].usercards === null){
										          				data.usercards[tempdata[i].id] = [];
										          			}else{
										          				data.usercards[tempdata[i].id] = [];
										          				let parr = tempdata[i].usercards.split(',');
										          				for (let arr =0 ; arr< parr.length ; arr++){
										          					data.usercards[tempdata[i].id].push((parr[arr]));
										          				}
										          			}
										          			data.seatstaken[tempdata[i].id] = tempdata[i].seatnumber;
										          			data.usersbet[tempdata[i].id] = tempdata[i].userbet;
										          			data.playedusers[tempdata[i].id] = tempdata[i].played;
										          		
											          		
										          	}
										          			console.log(colors.cyan("data ---> serverside fe_setEnvForSocket :" + JSON.stringify(data)));
											          		io.to(data.socketroom).emit('be_setEnvForSocket',data);

																							          	
										          }
										    });	
							          	
							          }
							    });	

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
/*

		socket.on('fe_checkTimerStarter', function(data){
		console.log(colors.cyan("user "+data.thisuser +"is in room :" +io.sockets.adapter.sids[socket.id]));
						

								let intervalid = setInterval(() => {
									   

									    	io.to(data.socketroom).emit('be_checkplaystatus');
										
									}, 3000);
								roomsinterval.set(data.socketroom , intervalid)	;
												
							
	    
		});

*/
		socket.on('fe_dispatchTimerTick', function(data){
			
			var room = io.sockets.adapter.rooms[data.gamesessionid];
			if (room)
			console.log(" ** ** ** ** **" +data.thisuser +"  " +room.length + " d l:" +  data.calls);

			console.log(colors.cyan("dispatching to the room :" +JSON.stringify(io.sockets.adapter.sids[socket.id])));
			data.calls++;
			if (data.calls <= 1){
					dbRequest.getTableSessionTimer(dbconn, data, function (result) {
					let dbtimer = -1;
				          if (typeof result.code !== "undefined" || result === "") {
				           		throw new Error('fe_dispatchTimerTick: getTableSessionTimer : -> result is empty or undefined');
				          } else {
				          	console.log(colors.cyan("colecting db record : fe_dispatchTimerTick : getTableSessionTimer:  "+ JSON.stringify(result)));

				          	dbtimer = result[0].timer;
				          	if (dbtimer <= 0 ){
								dbtimer = 6 ;
							}
					      	data.thistimer = dbtimer-1;
					      					

					      						dbRequest.updateTableSessionTimer(dbconn, data, function (result) {
	
											          if (typeof result.code !== "undefined" || result === "") {
											           		throw new Error('fe_dispatchTimerTick : -> result is empty or undefined');
											          } else {
											          	console.log(colors.cyan("colecting db record : fe_dispatchTimerTick :  "+ JSON.stringify(result)));


											          
												       io.to(data.gamesessionid).emit('be_dispatchTimerTick',data);

																								          	
											          }
											    });	
					      					

																	          	
				          }
				    });	


			}else{
				if (room){
					if (room.length == data.calls){
						data.calls = 0;
					}
				}
			}
				

			
		

	    
		});

		socket.on('fe_dealcards', function(data){
			console.log(colors.cyan("dealing cards :" +JSON.stringify(io.sockets.adapter.sids[socket.id])));
			
			let min=1;
			let max = -1;
			let random = -1;
			let removedindex = -1;
			let card = "";
			let userid = -1;
			let indextemp = -1;
			for (let i = 0 ; i< data.users.length; i++){
				for (let i = 0 ; i< data.users.length; i++){ 
    			max=data.deck.length;
    			random =Math.floor(Math.random() * (+max - +min)) + +min; 
    			indextemp = random-1;
    			userid =  data.users[i];
    			card = data.deck[indextemp];
    			removedindex = data.deck.splice(indextemp , 1);
    			if (data.usercards.hasOwnProperty(userid)){
    				(data.usercards[userid]).push(card) ;
    			}else
    			{
    				data.usercards[userid] = card ;
    			}
    			console.log(colors.cyan("fe_dealcards :randomno: "+ random +" deck size : " +max + " cards :" + JSON.stringify(data.usercards)));
    			}

    		}
    		
    							          	dbRequest.updateAlUsersCards(dbconn, data, function (result) {
			      		
										          if (typeof result.code !== "undefined" || result === "") {
										           		throw new Error('fe_dealcards : -> result is empty or undefined');
										          } else {
										          	console.log(colors.cyan("colecting db record : fe_dealcards :  "+ JSON.stringify(result)));


										          	console.log(colors.cyan("data ---> serverside fe_dealcards :" + JSON.stringify(data)));
											        io.to(data.gamesessionid).emit('be_dealcards',data);

																							          	
										          }
										    });	
										    
    		console.log(colors.cyan("fe_dealcards : deck left : " + JSON.stringify(data.deck)));
			//io.to(data.gamesessionid).emit('be_dealcards',data);

	    
		});

		socket.on('fe_switchToNetUser', function(data){
		
			console.log(colors.cyan("switch to next user called -> backend handling :" +JSON.stringify(io.sockets.adapter.sids[socket.id])));
			//data.userturn = 168;
			data.thistimer = 5;
			let actualseat = data.seatstaken[data.userturn];
			let possiblenextseat = actualseat;
			let changetouser = -1;
			do {
				actualseat = (actualseat+1) % 4;
				possiblenextseat = actualseat;
			 	for(var key in data.seatstaken) {
	          		console.log("actual seat : "+actualseat +" key :"+key + "value : " + data.seatstaken[key]);
	          		if (possiblenextseat == data.seatstaken[key]){
	          			changetouser =key;
	          			break;
	          		}
	        	}
	        	if (changetouser >=1){
	        		break;
	        	}
	    	}while(true);
	    	data.userturn = changetouser;
			console.log(JSON.stringify(data));
				dbRequest.updateUserTurn(dbconn, data, function (result) {

			          if (typeof result.code !== "undefined" || result === "") {
			           		throw new Error('fe_switchToNetUser : -> result is empty or undefined');
			          } else {
			          	console.log(colors.cyan("colecting db record : fe_switchToNetUser :  "+ JSON.stringify(result)));


			          	console.log(colors.cyan("data ---> serverside fe_switchToNetUser :" + JSON.stringify(data)));
				       io.to(data.gamesessionid).emit('be_switchToNetUser',data);

																          	
			          }
			    });	
			//io.to(data.gamesessionid).emit('be_switchToNetUser',data);
		
	    
		});

	});



}