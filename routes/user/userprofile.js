module.exports = function (app,dbRequest,dbconn) {

	app.get('/userprofile', (req, res) => {
		let authuser = {
			userid: req.session.userid,
			username: req.session.username,
			useremail: req.session.useremail,
			filetype: req.session.filetype,
			picture: req.session.picture,
			usertype: req.session.picture
		}
			console.log("userprofile view rendered");
			res.render('./user/userprofile', { authanticate: req.body.authanticate, authuser: authuser });
	// });
	});

	app.get('/changePassword', (req, res) => {
		let authuser = {
			userid: req.session.userid,
			username: req.session.username,
			useremail: req.session.useremail,
			filetype: req.session.filetype,
			picture: req.session.picture,
			usertype: req.session.picture
		}
		console.log("changePassword view rendered");
		res.render('./user/changePassword', {authanticate: req.body.authanticate, authuser: authuser });
	});

	app.post('/userprofile/changepassword', (req,res)=>{
		let authuser = {
			userid: req.session.userid,
			username: req.session.username,
			useremail: req.session.useremail,
			filetype: req.session.filetype,
			picture: req.session.picture,
			usertype: req.session.picture
		}

		console.log(req.body.password);

		let data = { "id": req.body.userid, "password": req.body.password };

		dbRequest.changePassword(dbconn, data, function (result) {
			console.log("changeProfile called");
			res.render('./user/userprofile', { authanticate: req.body.authanticate, authuser: authuser });
		});
	});

}