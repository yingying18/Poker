var colors = require('colors');
module.exports = function (app,dbRequest,dbconn) {

	app.get('/game',(req, res) =>{
		console.log("game called");
		res.render('./game/game');	
		
			 		
	});

	app.post('/game/joingamesession',(req, res) =>{
		console.log("game join game session called");
		console.log("join game session : "+JSON.stringify(req.body));
		let data = {};
		//{"userid":"168","seatno":1,"tabledata":{"table_id":1,"minamount":1,"active":1,"maxplayer":4},"authanticate":"true"}
		data.tableid = req.body.tabledata.table_id;
		data.userid = parseInt(req.body.userid);
		data.seatno = req.body.seatno;
		dbRequest.getGameTableSession(dbconn, data, function (result) {
        // returns  [{"id":19,"table_id":1,"state":"waiting","userturn":168,"usercyclestarter":168,"totalbet":0,"cycle":1,"maxcycle":1}]

                  if (typeof result.code !== "undefined" || result === "") {
                    res.send("we encountered an error while getting the game table session.");
                  }else {

                  	if (result.length === 0){
                  		console.log(colors.red("reult.length : "+result.length));
          				/*
          					below section handles : if there is no game session for the selected table
								-create a session in gametablesession
								-add logged user to gameusersession -> the user becomes game session starter

						*/
	          				dbRequest.createGameTableSession(dbconn, data, function (result) {
	          
					                  if (typeof result.code !== "undefined" || result === "") {
					                    res.send("we encountered an error while creating the game session.");
					                  } else {
					                  	
		          	          				dbRequest.getGameTableSession(dbconn, data, function (result) {

									                  if (typeof result.code !== "undefined" || result === "") {
									                   	res.send("we encountered an error while getting the game table session.");
									                  } else {
									                  	console.log("colecting record getGameTableSession"+ JSON.stringify(result[0]));
									                  	data.gametablesession = result[0];
									                  	data.gamesessionid =result[0].id;
									                  	dbRequest.createGameUserSession(dbconn, data, function (result) {

												                  if (typeof result.code !== "undefined" || result === "") {
												                   	res.send("we encountered an error while creating the game user session.");
												                  } else {
												                  	console.log("colecting last record "+ JSON.stringify(result));
												                  	//data.gametablesession = result[0];
												                  	dbRequest.getGameUserSessionForTable(dbconn, data, function (result) {

															                  if (typeof result.code !== "undefined" || result === "") {
															                   	res.send("we encountered an error while creating the game user session.");
															                  } else {
															                  	console.log("colecting last record "+ JSON.stringify(result));
															                  	//data.gametablesession = result[0];
															                    res.render('game/game',{
															                    		authanticate : req.session.authanticate, 
															                    		authuser : req.session.authuser, 
															                    		tabledata: req.body.tabledata,
															                    		gametablesession :data.gametablesession, 
															                    		gameusersession: result
															                    	});
															                  }
															        });	
												                  }
												        });	
									       
									                  }
									        });	
						                   
					                  }
					        });	

                  	}else{
                  		data.gametablesession = result[0];
                  		data.gamesessionid = result[0].id;
                  		/*
                  			below section handles : if there is already a game session for the selected table 
                  				-add user to gameusersession
						*/
		                dbRequest.createGameUserSession(dbconn, data, function (result) {

				                  if (typeof result.code !== "undefined" || result === "") {
				                   	res.send("we encountered an error while creating the game user session.");
				                  } else {

										dbRequest.getGameUserSessionForTable(dbconn, data, function (result) {

								                  if (typeof result.code !== "undefined" || result === "") {
								                   	res.send("we encountered an error while creating the game user session.");
								                  } else {
								                  	console.log("colecting last record "+ JSON.stringify(result));
								                  	//data.gametablesession = result[0];
								                    res.render('game/game',{
								                    		authanticate : req.session.authanticate, 
								                    		authuser : req.session.authuser, 
								                    		tabledata: req.body.tabledata,
								                    		gametablesession :data.gametablesession, 
								                    		gameusersession: result
								                    	});
								                  }
								        });	
				                  }
				        });	

                    	//res.render('./game/game',{authanticate : req.session.authanticate, authuser : req.session.authuser, tabledata : req.body.tabledata, gametablesession : result });	
                	}
                }
         });	
		//res.render('./game/game',{authanticate : req.session.authanticate, authuser : req.session.authuser, tabledata : req.body.tabledata });	
		
			 		
	});

}