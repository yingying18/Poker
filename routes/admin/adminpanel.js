module.exports = function (app, dbRequest, dbconn) {


	//need session to 
	app.get('/adminpanel', (req, res) => {
		console.log("adminpanel get called");

		//query for all entries in table users
		dbRequest.getUsers(dbconn, '', function (result) {
			res.render('admin/adminpanel', {
				result
			})
		});

	});

	app.post('/adminpanel/deleteuser', (req, res) => {
		console.log("delete user called");
		let data = {"id": req.body.id};

		dbRequest.deleteUser(dbconn, data, function (result) {
			console.log('deleted user : ' + data.id);
			
		});
	});


	//not working
	app.post('/adminpanel/saveuser', (req, res) => {

		console.log("save user called" + JSON.stringify(req.body));

		dbRequest.updateUser(dbconn, req.body, function (result) {

			let list = result;

			//res.render('./admin/users', {result:list});
			dbRequest.getUsers(dbconn, '', function (result) {

				let list = result;
				res.render('./admin/adminpanel', {
					result: list
				});

			});
		});
	});
}