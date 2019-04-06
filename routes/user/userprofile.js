module.exports = function (app,dbRequest,dbconn) {

	app.get('/userprofile',(req, res) =>{
		 console.log("register post called");	
					
		res.render('user/userprofile');
			 		
	});

}