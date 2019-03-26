const express = require('express');
const router = express.Router();

router.get('/',(req, res) =>{
	console.log('');
	res.render('./howtoplay');
	//res.send('');
	//res.end();
	//res.status(404).send('message');

});

module.exports = router;