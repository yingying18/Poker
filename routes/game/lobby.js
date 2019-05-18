var colors = require('colors');
module.exports = function (app,dbRequest,dbconn) {

	app.get('/lobby',(req, res) =>{
		console.log("get /lobby called");
		dbRequest.getAllTables(dbconn, null, function (result) {
                  
                  if (typeof result.code !== "undefined" || result === "") {
                    res.send("we encountered an error while calling the lobby.");
                  } else {
                  	console.log("lobby auth : "+req.session.authanticate);
                    res.render('game/lobby', {result : result, authanticate : req.session.authanticate, authuser : req.session.authuser});
                  }
         });	
		
			 		
	});


	app.post('/lobby/showgame',(req, res) =>{
		console.log(colors.green(" post /lobby/showgame"));
		console.log(colors.green("/lobby/showgame  data  : "+JSON.stringify(req.body)));
		let data = {
			authanticate : req.body.authanticate,
			tableid : req.body.tableid
		};
		 console.log(colors.red("/lobby/showgame getTableById passed data  : "+JSON.stringify(data)));
		dbRequest.getTableById(dbconn, data, function (result) {
        //returns [{"table_id":1,"minamount":1,"active":1,"maxplayer":4}]
       console.log(colors.red("/lobby/showgame getTableById result data  : "+JSON.stringify(result)));

                  if (typeof result.code !== "undefined" || result === "") {
                    throw new Error('getTableById : getTableById() -> result is empty or undefined');
                  } else {
                  	console.log(colors.red("getTableById  result data  : "+JSON.stringify(result)));
                  		data.tabledata = result[0];
                  				dbRequest.getGameTableSession(dbconn, data, function (result) {
                  				//returns  [{"id":19,"table_id":1,"state":"waiting","userturn":168,"usercyclestarter":168,"totalbet":0,"cycle":1,"maxcycle":1}]
                  				console.log(colors.red("getGameTableSession  result data  : "+JSON.stringify(data)));
						                  if (typeof result.code !== "undefined" || result === "") {
						                    throw new Error('getGameTableSession : getGameTableSession() -> result is empty or undefined');
						                  } else {
						                  		
							                  	if (result.length === 0){
							                  		res.render('game/game',
												                    		{	authanticate : req.session.authanticate, 
												                    			authuser : req.session.authuser, 
												                    			tabledata: data.tabledata
												                    			
												                    		}
												                    );

							                  	}else{
							                  		data.gamesessionid = result[0].id;

              		                  				dbRequest.getGameUserSessionForTable(dbconn, data, function (result) {
					                  				/*returns -may return multiple users-  
					                  				[{"id":168,"gamesession_id":19,"user_id":168,"seatnumber":1,"userbet":0,
					                  				"usercards":null,"username":"cavit","password":"cavit","usertype":0,"suspended":0,"deleted":0,
					                  				"email":"cavit","picture":1,"registerdate":"2019-04-14T07:00:00.000Z","filetype":"jpeg"}]
													*/


											                  if (typeof result.code !== "undefined" || result === "") {
											                     throw new Error('getGameUserSessionForTable : getGameUserSessionForTable() -> result is empty or undefined');
											                  } else {
											                  	//data.gameusersession = result[0].id;
												                  	

												                  	console.log("lobby auth : "+req.session.authanticate);
												                    res.render('game/game',
												                    		{	authanticate : req.session.authanticate, 
												                    			authuser : req.session.authuser, 
												                    			tabledata: data.tabledata,
												                    			gameusersession : result
												                    		}
												                    );
											                  }
											        });	
							                  	}


						                  }
						        });	

                  }
        });	
		 //res.render('game/game',{authanticate : req.session.authanticate, authuser : req.session.authuser});
		
			 		
	});


