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


module.exports = router;