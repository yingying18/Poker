module.exports = function (app,dbRequest,dbconn) {

	app.get('/lobby',(req, res) =>{
		 console.log("lobby called");	
					
			 			res.render('game/lobby');
			 		
	});

}