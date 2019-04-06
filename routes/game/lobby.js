module.exports = function (app,dbRequest,dbconn) {

	app.get('/lobby',(req, res) =>{
		 console.log("lobby post called");	
					
			 			res.render('game/lobby');
			 		
	});

}