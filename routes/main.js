const express = require('express');
const router = express.Router();

router.get('/',(req, res) =>{
	//res.render('index',{appname: 'myapp', message:'my message'});
	res.render('./main');
	//res.end();
	//res.status(404).send('message');

});

module.exports = router;