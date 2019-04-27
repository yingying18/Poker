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


	app.post('/lobby/showgame',(req, res) =>{
		console.log("lobby called");
		console.log("lobby show gane data : "+JSON.stringify(req.body));
		dbRequest.getTableById(dbconn, req.body, function (result) {
                  
                  if (typeof result.code !== "undefined" || result === "") {
                    res.send("we encountered an error while calling the game.");
                  } else {
                  	console.log("lobby auth : "+req.session.authanticate);
                    res.render('game/game',{authanticate : req.session.authanticate, authuser : req.session.authuser, result: result});
                  }
        });	
		 //res.render('game/game',{authanticate : req.session.authanticate, authuser : req.session.authuser});
		
			 		
	});

}