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
			if (typeof result.code !== "undefined" || result === "") {
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
					console.log("session : " + req.session.username);
					authuser = {
						userid: req.session.userid,
						username: req.session.username,
						useremail: req.session.useremail,
						filetype: req.session.filetype,
						picture: req.session.picture,
						usertype: req.session.picture
					}
					res.render('mainpage/index', { authanticate: "true", authuser: authuser });

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