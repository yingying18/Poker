module.exports = function (app,dbRequest,dbconn) {

	app.get('/howtoplay',(req, res) =>{
		 console.log("register post called");	
					
			 			res.render('game/howtoplay');
			 		
	});

}