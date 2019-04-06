module.exports = function (app,dbRequest,dbconn) {

	app.get('/login',(req, res) =>{
		 console.log("login called");	
			 			res.render('user/login');
			 		
	});

}