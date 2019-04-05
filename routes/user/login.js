module.exports = function (app,dbRequest,dbconn) {

	app.get('/login',(req, res) =>{
		 console.log("register post called");	
					
			 			res.render('user/login');
			 		
	});

}