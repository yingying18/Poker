module.exports = function (app,dbRequest,dbconn) {

	app.get('/register',(req, res) =>{
		 console.log("register post called");	
					
		res.render('user/register');
			 		
	});

}