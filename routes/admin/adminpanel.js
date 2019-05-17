module.exports = function (app,dbRequest,dbconn) {


	//need session to 
	app.get('/adminpanel',(req, res) =>{
		 console.log("adminpanel get called");	
		
		 dbRequest.getAllTables(dbconn, null, function(tablesresult){
			dbRequest.getUsers(dbconn, '', function(result){
				if (typeof tablesresult.code !== "undefined" || tablesresult === "") {
					res.send("we encountered an error while calling the lobby.");
				} else {
					//res.render('game/lobby', {result : tablesresult, authanticate : req.session.authanticate, authuser : req.session.authuser});
					res.render('admin/adminpanel', {result: result, tablesresult: tablesresult});
				}
			});
		})
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

	app.post('/adminpanel/addnewtable', (req, res) => {
		
	});
}