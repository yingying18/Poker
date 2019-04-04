// Required variables
const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

router.get('/',(req, res) =>{
	console.log('login');
	res.render('./login');
	//res.status(404).send('message');

});

var dbcon = mysql.createConnection({

	host: 'casualadd.com',
	user: 'csc',
	port: 3306,
	password: '1#2019',
	database: 'csc'

});

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({
	extended: true
}));
router.use(bodyParser.json());

// render login form
router.get('/', (req, res) => {
	console.log('login')
	res.render('login');
	//res.status(404).send('message');

});

// query and validate form
router.post('/auth', function (req, res) {
	console.log('auth');
	var username = req.body.username; // retrieve username from body of req
	var password = req.body.password; // retrieve password from body of req
	if (username && password) {
		connection.query('SELECT * FROM user', [username, password], function (error, results, fields) {
			if (res.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/login');
			} else {
				res.send('Incorrect Username and/or Password!');
				console.log('Could not find Username and/or Password');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

module.exports = router;