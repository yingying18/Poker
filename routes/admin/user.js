module.exports = function (app,dbRequest,dbconn) {

	app.post('/gotomenu/users',(req, res) =>{
		 console.log("gotomenu route called");

		 dbRequest.getUsers(dbconn,'',function(result){

					let list = result;
					
			 			res.render('./admin/users', {result:list});
			 		
		                         
		});
		
		
		

	});


	app.post('/admin/saveuser',(req, res) =>{
		
		console.log("save user called" + JSON.stringify(req.body));

			dbRequest.updateUser(dbconn,req.body,function(result){

						let list = result;
						
				 			//res.render('./admin/users', {result:list});
				 			dbRequest.getUsers(dbconn,'',function(result){

								let list = result;
					 			res.render('./admin/users', {result:list});
				                         
							});
			                         
			});
	});


}