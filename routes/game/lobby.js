const express = require('express');
const router = express.Router();

router.get('/lobby',(req, res) =>{
	console.log('');
	res.render('./lobby');


});

module.exports = router;