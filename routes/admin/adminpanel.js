module.exports = function (app,dbRequest,dbconn) {


	
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


	
	app.post('/adminpanel/removeuser',(req, res) => {
		console.log("remove user called");
		let data = {"id": req.body.id};

		dbRequest.removeUser(dbconn, data, function(result){
	
		});
	});

	
	app.post('/adminpanel/suspenduser',(req, res) => {
		console.log("suspend user called");
		let data = {"id": req.body.id};
		dbRequest.suspendUser(dbconn, data, function(result){
			console.log("");
		});
	});


	app.post('/adminpanel/addnewtable', (req, res) => {
		console.log("add new table called");
		let data = {"minamount": req.body.minamount, "maxplayer": req.body.maxplayer};
		console.log(JSON.stringify(data));
		tabledata = null;
		dbRequest.addnewtable(dbconn, data, function(result){
			if (typeof result.code !== "undefined" || result === "") {
					res.send("we encountered an error while calling the lobby.");
				} else {
							//res.render('game/lobby', {result : tablesresult, authanticate : req.session.authanticate, authuser : req.session.authuser});
							dbRequest.getAllTables(dbconn, data, function(result){
								if (typeof result.code !== "undefined" || result === "") {
										res.send("we encountered an error while calling the lobby.");
									} else {
												tabledata = result;
												dbRequest.getUsers(dbconn, '', function(result){
													if (typeof result.code !== "undefined" || result === "") {
														res.send("we encountered an error while calling the lobby.");
													} else {
														//res.render('game/lobby', {result : tablesresult, authanticate : req.session.authanticate, authuser : req.session.authuser});
														res.render('admin/adminpanel', {result: result, tablesresult: tabledata});
													}
												});
										
									}
									
							});
			}
			
		});
	});

	
	app.post('/adminpanel/giveadmin',(req, res) => {
		console.log("give admin called");
		let data = {"id": req.body.id};
		dbRequest.giveUserAdmin(dbconn, data, function(result){
			console.log("");
		});
	});

	//notworking
	app.post('/adminpanel/removetable', (req,res) => {
		console.log("give admin called");
		let data = {"id": req.body.id};
		dbRequest.removeTable(dbconn, data, function(result){
						if (typeof result.code !== "undefined" || result === "") {
					res.send("we encountered an error while calling the lobby.");
				} else {
							//res.render('game/lobby', {result : tablesresult, authanticate : req.session.authanticate, authuser : req.session.authuser});
							dbRequest.getAllTables(dbconn, data, function(result){
								if (typeof result.code !== "undefined" || result === "") {
										res.send("we encountered an error while calling the lobby.");
									} else {
												tabledata = result;
												dbRequest.getUsers(dbconn, '', function(result){
													if (typeof result.code !== "undefined" || result === "") {
														res.send("we encountered an error while calling the lobby.");
													} else {
														//res.render('game/lobby', {result : tablesresult, authanticate : req.session.authanticate, authuser : req.session.authuser});
														res.render('admin/adminpanel', {result: result, tablesresult: tabledata});
													}
												});
										
									}
									
							});
			}
		});
	});

	
	app.post('/adminpanel/removeadmin',(req, res) => {
		console.log("removeadmin called");
		let data = {"id": req.body.id};
		dbRequest.removeUserAdmin(dbconn, data, function(result){
			console.log("");
		});
	});

}