module.exports = function (app,dbRequest,dbconn) {


	//need session to 
	app.get('/adminpanel',(req, res) =>{
		 console.log("adminpanel get called");	
					
		 dbRequest.getUsers(dbconn, '', function(result){
			res.render('admin/adminpanel', {result})
		 });
			 		
	});


	//not working
	app.post('/adminpanel/saveuser',(req, res) =>{
		
		console.log("save user called" + JSON.stringify(req.body));

			dbRequest.updateUser(dbconn,req.body,function(result){

				let list = result;
						
				//res.render('./admin/users', {result:list});
				dbRequest.getUsers(dbconn,'',function(result){

					let list = result;
					res.render('./admin/adminpanel', {result:list});
				                         
				});
			});
	});
}