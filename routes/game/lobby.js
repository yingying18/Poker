var colors = require('colors');
module.exports = function (app,dbRequest,dbconn) {

	app.get('/lobby',(req, res) =>{
		console.log("lobby called");
		dbRequest.getAllTables(dbconn, null, function (result) {
                  
                  if (typeof result.code !== "undefined" || result === "") {
                    res.send("we encountered an error while calling the lobby.");
                  } else {
                  	console.log("lobby auth : "+req.session.authanticate);
                    res.render('game/lobby', {result : result, authanticate : req.session.authanticate, authuser : req.session.authuser});
                  }
         });	
		
			 		
	});

	/*
		first check if table is in play 
		each render needs to send these paremeters to game.ejs
			authanticate : req.session.authanticate
			authuser :	req.session.authuser				
			tabledata : [{"table_id":1,"minamount":1,"active":1,"maxplayer":4}]
			gameusersession : 
			gametablesession :  [{"id":19,"table_id":1,"state":"waiting","userturn":168,"usercyclestarter":168,"totalbet":0,"cycle":1,"maxcycle":1}]


			what authuser contains -->
			authuser = {
						userid: req.session.userid,
						username: req.session.username,
						useremail: req.session.useremail,
						filetype: req.session.filetype,
						picture: req.session.picture,
						usertype: req.session.picture
			}
	*/
	app.post('/lobby/showgame',(req, res) =>{
		console.log(colors.green("lobby called"));
		console.log(colors.green("lobby show game data  : "+JSON.stringify(req.body)));
		let data = {
			authanticate : req.body.authanticate,
			tableid : req.body.tableid
		};
		console.log(colors.red("error :"+data.tableid));
		dbRequest.getTableById(dbconn, data, function (result) {
        //returns [{"table_id":1,"minamount":1,"active":1,"maxplayer":4}]

                  if (typeof result.code !== "undefined" || result === "") {
                    res.send("we encountered an error while calling the db getTableById.");
                  } else {
                  		data.tabledata = result[0];
                  				dbRequest.getGameTableSession(dbconn, data, function (result) {
                  				//returns  [{"id":19,"table_id":1,"state":"waiting","userturn":168,"usercyclestarter":168,"totalbet":0,"cycle":1,"maxcycle":1}]

						                  if (typeof result.code !== "undefined" || result === "") {
						                    res.send("we encountered an error while calling db getGameTableSession.");
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
					                  				//returns -may return multiple users-  [{"id":7,"gamesession_id":19,"user_id":168,"seatnumber":1,"userbet":0,"usercards":null}]


											                  if (typeof result.code !== "undefined" || result === "") {
											                    res.send("we encountered an error while calling db getGameUserSessionForTable.");
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

}