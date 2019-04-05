module.exports = function (app,dbRequest,dbconn) {

	app.get('/adminpanel',(req, res) =>{
		 console.log("admin get called");	
					
			 			res.render('admin/adminpanel');
			 		
	});

}