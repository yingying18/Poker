module.exports = function (app,dbRequest,dbconn) {

	app.get('/lobby',(req, res) =>{
		console.log("lobby called");
		dbRequest.getAllTables(dbconn, null, function (result) {
                  
                  if (typeof result.code !== "undefined" || result === "") {
                    res.send("we encountered an error while calling the lobby.");
                  } else {
                  	console.log(JSON.stringify(result[1]));
                    res.render('game/lobby', {result : result, authanticate : req.body.authanticate});
                  }
         });	
		
			 		
	});

}