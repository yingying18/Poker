module.exports = function (app, dbRequest, dbconn) {

	app.get('/', (req, res) => {
		let authuser = {
			userid: req.session.userid,
			username: req.session.username,
			useremail: req.session.useremail,
			filetype: req.session.filetype,
			picture: req.session.picture,
			usertype: req.session.usertype
		}
		console.log("main view called");
		res.render('./mainpage/main', { authanticate: req.body.authanticate, authuser: authuser });



	});
	app.get('/index', (req, res) => {
		let authuser = {
			userid: req.session.userid,
			username: req.session.username,
			useremail: req.session.useremail,
			filetype: req.session.filetype,
			picture: req.session.picture,
			usertype: req.session.usertype
		}
		console.log("main view called");
		res.render('./mainpage/index', { authanticate: req.body.authanticate, authuser: authuser });


	});

	app.get('/navbar', (req, res) => {
		let authuser = {
			userid: req.session.userid,
			username: req.session.username,
			useremail: req.session.useremail,
			filetype: req.session.filetype,
			picture: req.session.picture,
			usertype: req.session.usertype
		}
		console.log("navbar called");
		res.render('./mainpage/header', { authanticate: req.body.authanticate, authuser: authuser });


	});
}