module.exports = function (app,dbRequest,dbconn) {

	app.get('/about',(req, res) =>{
		 console.log("register post called");	
					
			 			res.render('about/about');
			 		
	});

}