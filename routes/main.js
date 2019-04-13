module.exports = function (app, dbRequest, dbconn) {

	app.get('/', (req, res) => {

		console.log("main view called");
		res.render('./mainpage/main', { authanticate: req.body.authanticate });



	});
	app.get('/index', (req, res) => {

		console.log("main view called");
		res.render('./mainpage/index', { authanticate: req.body.authanticate });


	});

	app.get('/navbar', (req, res) => {

		console.log("navbar called");
		res.render('./mainpage/header', { authanticate: req.body.authanticate });


	});
}