const express = require('express');
const router = express.Router();

router.get('/',(req, res) =>{
	console.log('admin rendered');
	res.render('./adminpanel');
});

module.exports = router;