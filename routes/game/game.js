const express = require('express');
const router = express.Router();

router.get('/game',(req, res) =>{
	
	console.log('');
	res.render('./game');


});

module.exports = router;