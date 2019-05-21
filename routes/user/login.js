module.exports = function (app, dbRequest, dbconn) {

	app.get('/login', (req, res) => {
		console.log("login called");
		res.render('user/login');

	});

	app.post('/login/authanticate', (req, res) => {
		console.log("login authanticate called");
		console.log("user : " + req.body.username);
		console.log("user : " + req.body.password);
		let data = { "username": req.body.username, "password": req.body.password };
		//let data = reg

		dbRequest.checkLoginUser(dbconn, data, function (result) {
			// console.log("return" + JSON.stringify(result));
			if (typeof result.code !== "undefined" ) {
				res.send("we encountered an error during the login");
			} else {
				console.log("login result db : " + JSON.stringify(result) + result.length);
				if (result.length == 0) {
					res.render('user/login', { response: "false" });
				} else {

					req.session.userid = result[0].id;
					req.session.username = result[0].username;
					req.session.useremail = result[0].email;
					req.session.filetype = result[0].filetype;
					req.session.picture = result[0].picture;
					req.session.usertype = result[0].usertype;
					req.session.deleted = result[0].deleted;
					req.session.suspended = result[0].suspended;
					authuser = {
						userid: req.session.userid,
						username: req.session.username,
						useremail: req.session.useremail,
						filetype: req.session.filetype,
						picture: req.session.picture,
						usertype: req.session.usertype
					}
					if ((result[0].deleted == 0) && (result[0].suspended == 0)){
						req.session.authanticate = "true";	
						req.session.authuser = authuser;

					}else{
						req.session.authanticate = "false";	
						req.session.authuser = null;
					}
					if (req.session.authuser == null){
						req.session == null;
						res.render('user/login',{ authanticate: req.session.authanticate, authuser: req.session.authuser });
					}else{
						res.render('mainpage/index', { authanticate: req.session.authanticate, authuser: req.session.authuser });
					}
					
				}
			}
		});

		//res.response('logged in ');
		//res.send('logged in failed ');

	});

	app.post('/logout', (req, res) => {
		console.log("logout called");
		//req.session = null;
		req.session.destroy();
		req.body.authanticate = "false";
		res.render('mainpage/index', { authanticate: "false" });

	});

}