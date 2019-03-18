const express = require('express');
const app = express();
app.set('view engine','ejs');
app.set('views','./views');
const login = require('./routes/login');
const home = require('./routes/home');
const main = require('./routes/main');
const dbconn = require('./utils/dbconn.js');
const dbRequest = require('./utils/dbrequest.js')
app.use(express.static('public'));


//console.log('node enf'+process.env.NODE_ENV);
//console.log('env'+ app.get('env'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.use('/login',login);
app.use('/',home);
//app.use('/main',main);

//admin pages

//require('./routes/admin/user.js')(app,dbRequest,dbconn);
require('./routes/main.js')(app,dbRequest,dbconn);

app.use(function(req,res,next){

	console.log('example middleware');
	next();


});





app.listen(3000, ()=>{ console.log('listening om port 3000')});
