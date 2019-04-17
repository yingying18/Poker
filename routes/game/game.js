module.exports = function (app, dbRequest, dbconn) {

	app.get('/game', (req, res) => {

		console.log("game view called");
		res.render('game/game');
	});

}