const express = require('express');
const router = express.Router();

router.get('/',(req, res) =>{
	console.log('home');
	res.render('./index');
	//res.send('home');
	//res.end();
	//res.status(404).send('message');

});

module.exports = router;