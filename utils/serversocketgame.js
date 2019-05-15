var colors = require('colors');
module.exports = function (server,socket,dbRequest, dbconn ) {

var sockettracker = new Map();
var userroom = new Map();
var rooms = [];
var intervaltrack = new Map();
var gamestartintervaltrack = new Map();


function refreshdata(data,callback){

			console.log(colors.red("-------------------- refresh data" + JSON.stringify(data)));
			/*data : {"thisuser":168,"thissocketid":"","thiscards":[],"thisseatno":0,"thisbet":0,
			"seatstaken":[],"users":[],"deck":[],"gamesessionid":0,"housecards":[],"usercards":[],
			"socketroom":0,"socketids":[],"gamestatus":"","userstatus":"","gamecycle":0,
			"userturn":0,"tableid":null,"usersinsocketroom":[],"tablemoney":0,"timer":5}
			*/
			let gamesessionid = null;
			
	      	dbRequest.getGameTableSession(dbconn, data, function (result) {
	      	// [{"id":45,"table_id":1,"state":"waiting","userturn":168,"usercyclestarter":168,"totalbet":0,"cycle":1,"maxcycle":1}]

	          if (typeof result.code !== "undefined" ) {
	           		throw new Error('error : refreshdata :getGameTableSession() -> result is empty or undefined');
	          } else {

	          	
	          	let tempdata = result;
	          	let tempdatalength = tempdata.length;
	          	
	          	if (tempdatalength <=0 ){
	          		console.log(colors.red(" nothing to refresh "));
	          	}else {
		          	
		          		
		          		data.gamesessionid = tempdata[0].id;
		          		data.deck = [];
		          		data.socketroom = tempdata[0].id;
		          		data.userturn = parseInt(tempdata[0].userturn);
		          		data.thissocketid = socket.id;
	          			data.socketids[data.thisuser] = socket.id;
	          			data.thistimer = tempdata[0].timer;
	          			data.cycle = tempdata[0].cycle;
	          			data.maxcycle =tempdata[0].maxcycle;
		          		data.gamestatus = tempdata[0].state;
		          		data.tableid = tempdata[0].table_id;
		          		data.seatstaken = {};
		          		data.playedusers = {};
		          		data.housecards = [];
		          		data.usercards = {};

		          		      	dbRequest.get52Cards(dbconn, null, function (result) {
						      		
							          if (typeof result.code !== "undefined" ) {
							           		throw new Error('refreshdata : get52Cards() -> result is empty or undefined');
							          } else {
							          	
								          	let tempdata = result;
								          	let tempdatalength = tempdata.length;
								          	for (let i = 0 ; i <tempdatalength ; i++){
								          		data.deck.push(tempdata[i].id);
									          		
								          	}
						          			
							          		
					          				dbRequest.getGameUserSessionForTable(dbconn, data, function (result) {
			      		
										          if (typeof result.code !== "undefined" ) {
										           		throw new Error('refreshdata : getGameUserSessionForTable() -> result is empty or undefined');
										          } else {
										          	
										          	let tempdata = result;
										          	let tempdatalength = tempdata.length;
										          	data.users=[];
										          	for (let i = 0 ; i <tempdatalength ; i++){
										          				data.users.push(tempdata[i].id );
										          				
										          			data.usercards[tempdata[i].id ]=[];
										          			data.seatstaken[tempdata[i].id] = tempdata[i].seatnumber;
										          			data.playedusers[tempdata[i].id] = tempdata[i].played;
										          		
											          		
										          	}
										          	
										          			console.log(colors.cyan("%%%%%%%%%%% refreshdata serverside sends refresh data :" + JSON.stringify(data)));
											          		
													callback(data);
																							          	
										          }
										    });	
							          	
							          }
							    });	

	          	}
	          }
		    });	

	

}



let io = socket(server);

	io.on('connection', function(socket){
		console.log(colors.cyan("------socket connected : "+socket.id));

		
		socket.on('disconnect', function() {
			
			console.log(colors.cyan("---------socket disconnected : "+socket.id));
		});

		socket.on('fe_userleft', function(data) {
			console.log("$$$$$$$$$$$$$$$$$$$$$ before refresh data called"+ JSON.stringify(data));
			let leavinguser = data.thisuser;
			let leavinguserseat = data.seatstaken[data.thisuser];
			let usersinleavinses = data.users;
				refreshdata(data,function(returndata){
					data = returndata;
			
			console.log(colors.cyan("---------user_left : "+socket.id));
			clearInterval(intervaltrack.get(data.gamesessionid));
			intervaltrack.set(data.gamesessionid, 'undefined');
			clearInterval(gamestartintervaltrack.get(data.gamesessionid));
			gamestartintervaltrack.set(data.gamesessionid, 'undefined');
			console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{ "+JSON.stringify(data));
			let alluser = null;
			    dbRequest.getAllUserForGameSession(dbconn, data, function (result) {

			          if (typeof result.code !== "undefined" ) {
			           		throw new Error('getGameSessionForUser : -> result is empty or undefined');
			          } else {
			          	alluser = result;
			          		console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));
			          		console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));
			          		console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));

			          		console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));


			          		console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));
			          		console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "+result.length));

			          		console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "+ JSON.stringify(result)));

			          		if (alluser.length==0){
			          				console.log("session has no user delete session");
			          				    dbRequest.deleteGameSession(dbconn, data, function (result) {

									          if (typeof result.code !== "undefined" ) {
									           		throw new Error('deleteGameSession : -> result is empty or undefined');
									          } else {
									          	console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));
									          		console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));
									          			console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));

									          				console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));


									          					console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));
									          						console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "));

									          	console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "+ JSON.stringify(result)));
																						          	
									          }
									    });	
			          		}else{
			          			console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  response more than 0"));
			          					console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "+ JSON.stringify(result)));
			          					console.log(colors.cyan("VVVVVVVVVVVVV  VVVVVVVVVVVVV :  "+ JSON.stringify(data)));

			          					let actualseat = leavinguserseat
										let possiblenextseat = actualseat;
										let changetouser = -1;
										
										do {
											actualseat = (actualseat+1) % 5;
											possiblenextseat = actualseat;
										 	for(let m=0; m< alluser.length; m++) {
								          		console.log("actual seat : "+actualseat + "  "+ alluser[m].seatnumber);
								          		if (possiblenextseat == alluser[m].seatnumber){
								          			changetouser =alluser[m].user_id;
								          			break;
								          		}
								        	}
								        	if (changetouser >=1){
								        		break;
								        	}
								    	}while(true);
								    	
								    	data.userturn = changetouser;
								    					dbRequest.updateUserTurn(dbconn, data, function (result) {

													          if (typeof result.code !== "undefined" || result === "") {
													           		throw new Error('updateUserTurn : -> result is empty or undefined');
													          } else {
													          	console.log(colors.cyan("colecting db record : updateUserTurn :  "+ JSON.stringify(result)));


													          	console.log(colors.cyan("data ---> serverside updateUserTurn :" + JSON.stringify(data)));
														       startGame(data);

																										          	
													          }
													    });	
			          			
			          	}
																          	
			          }
			    });	

			//io.to(data.socketroom).emit('be_updateData',data);
			});
		});

		socket.on('fe_updatedata', function(data) {
			data = refreshdata(data,function(returndata){
				data = returndata;
			console.log(colors.cyan("---------socket disconnected : "+socket.id));
			io.to(data.socketroom).emit('be_updateData',data);
			});
			
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

	          if (typeof result.code !== "undefined") {
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
		          		console.log("----------------------"+ userroom.get(data.thisuser ));
		          		if ( typeof userroom.get(data.thisuser ) === "undefined"){
		          			console.log("--------------------- set userrrom");
		          			userroom.set(data.thisuser,data.gamesessionid);
		          		}
		          		data.socketroom = tempdata[0].id;
		          		data.userturn = parseInt(tempdata[0].userturn);
		          		data.thissocketid = socket.id;
	          			data.socketids[data.thisuser] = socket.id;
	          			data.thistimer = tempdata[0].timer;
	          			data.cycle = tempdata[0].cycle;
	          			data.maxcycle =tempdata[0].maxcycle;
		          		data.gamestatus = tempdata[0].state;
		          		

		          		if (tempdata[0].housecards !== null){
		          			data.housecards = (tempdata[0].housecards).split(',');	
		          		}else{
		          			data.housecards = [];
		          		}

		          		
		          		


		          		      	dbRequest.get52Cards(dbconn, null, function (result) {
						      		
							          if (typeof result.code !== "undefined" ) {
							           		throw new Error('fe_setEnvForSocket : get52Cards() -> result is empty or undefined');
							          } else {
							          	
								          	let tempdata = result;
								          	let tempdatalength = tempdata.length;
								          	for (let i = 0 ; i <tempdatalength ; i++){
								          		data.deck.push(tempdata[i].id);
									          		
								          	}
						          			
							          		
					          				dbRequest.getGameUserSessionForTable(dbconn, data, function (result) {
			      		
										          if (typeof result.code !== "undefined" ) {
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

		function startGame(data){
			console.log('fe start game :' + data.gamestatus);
			if (data.gamestatus == 'waiting' ){ 
				
				if (intervaltrack.get(data.gamesessionid) !== 'undefined'){
					clearInterval(intervaltrack.get(data.gamesessionid));
					intervaltrack.set(data.gamesessionid, 'undefined');
				}
				refreshdata(data,function(returndata){
					data = returndata;
				if ((typeof gamestartintervaltrack.get(data.gamesessionid) === 'undefined') || (gamestartintervaltrack.get(data.gamesessionid) == 'undefined')){	
					
						gamestartintervaltrack.set(data.gamesessionid ,  setInterval(function(data){
					
								data.gamestartinsec--;
								refreshdata(data, function(returndata){
								data = returndata;
								if (data.gamestartinsec <0){
									data.gamestartinsec = 10;
									
									io.to(data.gamesessionid).emit('be_updateData',data);
								}
								dbRequest.updateGameStartInTimer(dbconn, data, function (result) {

							          if (typeof result.code !== "undefined" ) {
							           		throw new Error('fe_startgame : updateGameStartInTimer-> result is empty or undefined');
							          } else {
							          	console.log(colors.cyan("colecting db record : fe_startgame :updateGameStartInTimer  "+ JSON.stringify(result)));


							         
								       		
								   		if (data.gamestartinsec == 10){
								   			data.gamestartinsec = 10;
								   			data.gamestatus = 'inplay';
								   			clearInterval(gamestartintervaltrack.get(data.gamesessionid));
											gamestartintervaltrack.set(data.gamesessionid, 'undefined');

													dbRequest.updateTableState(dbconn, data, function (result) {
		
												          if (typeof result.code !== "undefined" ) {
												           		throw new Error('updateTableState : -> result is empty or undefined');
												          } else {
												          	console.log(colors.cyan("colecting db record : updateTableState :  "+ JSON.stringify(result)));


												          	console.log(colors.cyan("data ---> serverside updateTableState :" + JSON.stringify(data)));
													        io.to(data.gamesessionid).emit('be_startgame',data);

																									          	
												          }
												    });	
											
								   		}
								   		io.to(data.gamesessionid).emit('be_startgame',data);

																				          	
							          }
							    });	



								});



		 				}, 800, data));
				}

				});

	    	}else{

	    			io.to(data.gamesessionid).emit('be_startgame',data);

	    	}
		}

		socket.on('fe_startgame', function(data){
			startGame(data);
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

		socket.on('fe_incrementcycle', function(data){
			clearInterval(intervaltrack.get(data.gamesessionid));
			intervaltrack.set(data.gamesessionid, 'undefined');
			 data.cycle++;
			 for (var key in data.playedusers ){
			 	data.playedusers[key] = 0;
			 }
			 if (data.cycle >= data.maxcycle){
			 	data.cycle = 1;
			 	for (var key in data.usercards ){
			 		data.usercards[key] = [];
			 	}
			 	data.housecards = [];
			 	data.gamestartinsec = 10;
			 	data.gamestatus = 'waiting';
			 			dbRequest.setNullAllCards(dbconn, data, function (result) {
		
					          if (typeof result.code !== "undefined" ) {
					           		throw new Error('fe_dealcards : -> result is empty or undefined');
					          } else {
					          	console.log(colors.cyan("colecting db record : setNullAllCards :  "+ JSON.stringify(result)));


					          	console.log(colors.cyan("data ---> serverside setNullAllCards :" + JSON.stringify(data)));
						        	
						        	dbRequest.setNullHouseCards(dbconn, data, function (result) {
		
								          if (typeof result.code !== "undefined" ) {
								           		throw new Error('setNullHouseCards : -> result is empty or undefined');
								          } else {
								          	console.log(colors.cyan("colecting db record : setNullHouseCards :  "+ JSON.stringify(result)));


								          	console.log(colors.cyan("data ---> serverside setNullHouseCards :" + JSON.stringify(data)));
									        		
									        		dbRequest.updateTableState(dbconn, data, function (result) {
		
												          if (typeof result.code !== "undefined" ) {
												           		throw new Error('updateTableState : -> result is empty or undefined');
												          } else {
												          	console.log(colors.cyan("colecting db record : updateTableState :  "+ JSON.stringify(result)));


												          	console.log(colors.cyan("data ---> serverside updateTableState :" + JSON.stringify(data)));
													        io.to(data.gamesessionid).emit('be_sessionover',data);

																									          	
												          }
												    });	

																					          	
								          }
								    });	

																		          	
					          }
					    });	
			 	
			 }else{
				dbRequest.updateCycle(dbconn, data, function (result) {

			          if (typeof result.code !== "undefined" ) {
			           		throw new Error('updateCycle : -> result is empty or undefined');
			          } else {
			          	console.log(colors.cyan("colecting db record : updateCycle :  "+ JSON.stringify(result)));

				      		io.to(data.gamesessionid).emit('be_incrementcycle',data);
																          	
			          }
			    });	
			 	
			 }
			 
	    
		});


		socket.on('fe_dispatchTimerTick', function(data){
			console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^ : "+intervaltrack.get(data.gamesessionid));
		if ((typeof intervaltrack.get(data.gamesessionid) === 'undefined') || (intervaltrack.get(data.gamesessionid) == 'undefined')){	
			console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^ : intervaltrack started ");
			 intervaltrack.set(data.gamesessionid ,  setInterval(function(data){
			

          

    

			let controlcycle = 1;
			let room = io.sockets.adapter.rooms[data.gamesessionid];
			let dbtimer = data.thistimer;
			if (room)
			console.log(" ** ** ** ** ** uturn :" +data.userturn+"  "+data.thisuser +"  " +room.length + " d l:" +  data.calls);

			console.log(colors.cyan("dispatching to the room :" +JSON.stringify(io.sockets.adapter.sids[socket.id])));


					for (var key in data.playedusers){
						console.log("check : "+key + "values:" + data.playedusers[key]);
						if (data.playedusers[key] == 0){
							console.log("there is 0 ");
							controlcycle = -1;
						}
						
						
						
					}
					if (controlcycle <1){	
						console.log("timer updated");


						      	//data.thistimer = dbtimer-1;
						      	dbRequest.getTableSessionTimer(dbconn, data, function (result) {
					
								          if (typeof result.code !== "undefined" ) {
								           		throw new Error('getTableSessionTimer : -> result is empty or undefined');
								          } else {
								          	console.log(colors.cyan("colecting db record : getTableSessionTimer :  "+ JSON.stringify(result)));

								dbtimer = result[0].timer;
								
					          	if (dbtimer <= 0 ){
					          		if (dbtimer == 0){
										data.playedusers[data.userturn] = 1;
													
										
									}
									dbtimer = 6 ;
								}
								dbtimer--;
								 data.thistimer = dbtimer;         
									      // io.to(data.gamesessionid).emit('be_dispatchTimerTick',data);



						      						dbRequest.updateTableSessionTimer(dbconn, data, function (result) {
		
												          if (typeof result.code !== "undefined" ) {
												           		throw new Error('updateTableSessionTimer : -> result is empty or undefined');
												          } else {
												          	console.log(colors.cyan("colecting db record : updateTableSessionTimer :  "+ JSON.stringify(result)));


												          
			   						      						dbRequest.updatePlayeduser(dbconn, data, function (result) {
					
															          if (typeof result.code !== "undefined" ) {
															           		throw new Error('updatePlayeduser : -> result is empty or undefined');
															          } else {
															          	console.log(colors.cyan("colecting db record : updatePlayeduser :  "+ JSON.stringify(result)));


															          //socket.to(data.gamesessionid).emit('be_dispatchTimerTick', data);
																       io.to(data.gamesessionid).emit('be_dispatchTimerTick',data);

																												          	
															          }
															    });	

																									          	
												          }
												    });	

																														          	
								          }
								});										          	
					 

				}else{
					    dbRequest.clearAllPlayedUser(dbconn, data, function (result) {

					          if (typeof result.code !== "undefined" ) {
					           		throw new Error('clearAllPlayedUser : -> result is empty or undefined');
					          } else {
					          	console.log(colors.cyan("colecting db record : clearAllPlayedUser :  "+ JSON.stringify(result)));
					          		data.cycle = 1;
						      		dbRequest.updateCycle(dbconn, data, function (result) {

								          if (typeof result.code !== "undefined" ) {
								           		throw new Error('clearAllPlayedUser : -> result is empty or undefined');
								          } else {
								          	console.log(colors.cyan("colecting db record : clearAllPlayedUser :  "+ JSON.stringify(result)));

									      		
	      				          		      	 io.to(data.gamesessionid).emit('be_cycleover',data);
																					          	
								          }
								    });	
																		          	
					          }
					    });	
					
				}		

				

			
		
				  }, 1000, data));
			}
			 //clearInterval(intervaltrack.get(data.gamesessionid));
			});

		socket.on('fe_dealcards', function(data){
			clearInterval(intervaltrack.get(data.gamesessionid));
			intervaltrack.set(data.gamesessionid, 'undefined');
			console.log("cals: ------------------- "+data.calls);

				console.log(colors.cyan("dealing cards :" +JSON.stringify(io.sockets.adapter.sids[socket.id])));
				let dealcardnumber = -1;
				let min=1;
				let max = -1;
				let random = -1;
				let removedindex = -1;
				let card = "";
				let userid = -1;
				let indextemp = -1;
				if ( (data.usercards[data.users[0]] !== null) && (data.usercards[data.users[0]].length >= 2 )){
					dealcardnumber = 1;
				}else{
					dealcardnumber =2;
				}

				for (let i = 0 ; i< dealcardnumber; i++){
					for (let i = 0 ; i<= data.users.length; i++){ 
						
			    			max=data.deck.length;
			    			random =Math.floor(Math.random() * (+max - +min)) + +min; 
			    			indextemp = random-1;
			    			card = data.deck[indextemp];
			    			removedindex = data.deck.splice(indextemp , 1);
			    		if (i<data.users.length){
			    			userid =  data.users[i];
			    			if (data.usercards.hasOwnProperty(userid)){
			    				(data.usercards[userid]).push(card) ;
			    			}else
			    			{
			    				data.usercards[userid] = card ;
			    			}
			    		}else{
			    				data.housecards.push(card);

			    			console.log(colors.cyan("fe_dealcards :randomno: "+ random +" deck size : " +max + " cards :" + JSON.stringify(data.usercards)));
			    		}
	    			}

	    		}
	    		
			          	dbRequest.updateAlUsersCards(dbconn, data, function (result) {
		
					          if (typeof result.code !== "undefined" || result === "") {
					           		throw new Error('fe_dealcards : -> result is empty or undefined');
					          } else {
					          	console.log(colors.cyan("colecting db record : updateAlUsersCards :  "+ JSON.stringify(result)));


					          	console.log(colors.cyan("data ---> serverside updateAlUsersCards :" + JSON.stringify(data)));
						        	
						        	dbRequest.updateHouseCards(dbconn, data, function (result) {
		
								          if (typeof result.code !== "undefined" || result === "") {
								           		throw new Error('updateHouseCards : -> result is empty or undefined');
								          } else {
								          	console.log(colors.cyan("colecting db record : updateHouseCards :  "+ JSON.stringify(result)));


								          	console.log(colors.cyan("data ---> serverside updateHouseCards :" + JSON.stringify(data)));
									        io.to(data.gamesessionid).emit('be_dealcards',data);

																					          	
								          }
								    });	

																		          	
					          }
					    });	
											    
	    		//console.log(colors.cyan("fe_dealcards : deck left : " + JSON.stringify(data.deck)));
				//io.to(data.gamesessionid).emit('be_dealcards',data);
		
	    
		});

		socket.on('fe_switchToNetUser', function(data){
			clearInterval(intervaltrack.get(data.gamesessionid));
			intervaltrack.set(data.gamesessionid, 'undefined');
			let room = io.sockets.adapter.rooms[data.gamesessionid];


			console.log(colors.cyan("switch to next user called -> backend handling :" +JSON.stringify(io.sockets.adapter.sids[socket.id])));
			//data.userturn = 168;
			//data.thistimer = 5;
			let actualseat = data.seatstaken[data.userturn];
			let possiblenextseat = actualseat;
			let changetouser = -1;
			do {
				actualseat = (actualseat+1) % 5;
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