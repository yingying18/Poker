const express = require('express');
const app = express();

const login = require('./routes/login');
const home = require('./routes/home');
app.set('view engine','ejs');
app.set('views','./views');



//console.log('node enf'+process.env.NODE_ENV);
//console.log('env'+ app.get('env'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/login',login);
app.use('/',home);

app.use(function(req,res,next){

	console.log('example middleware');
	next();


});





app.listen(3000, ()=>{ console.log('listening om port 3000')});