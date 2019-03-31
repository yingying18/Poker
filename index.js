const express = require('express');
const app = express();
app.set('view engine','ejs');
app.set('views','./views');
const login = require('./routes/login');
const home = require('./routes/home');
const main = require('./routes/main');
const howtoplay= require('./routes/howtoplay');
const about = require('./routes/about');
const game = require('./routes/game');
const lobby = require('./routes/lobby');
const register = require('./routes/register');
const userprofile = require('./routes/userprofile');

const dbconn = require('./utils/dbconn.js');
const dbRequest = require('./utils/dbrequest.js')
app.use(express.static('public'));

// Error 404
// TO-DO

//console.log('node enf'+process.env.NODE_ENV);
//console.log('env'+ app.get('env'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.use('/login',login);
app.use('/',home);
app.use('/howtoplay',howtoplay);
app.use('/about', about);
app.use('/game', game);
app.use('/lobby', lobby);
app.use('/register', register);
app.use('/userprofile', userprofile);
//app.use('/main',main);

//admin pages

require('./routes/admin/user.js')(app,dbRequest,dbconn);
require('./routes/main.js')(app,dbRequest,dbconn);

app.use(function(req,res,next){

	console.log('example middleware');
	next();

});




// Start listening on port 3000
app.listen(3000, ()=>{ console.log('listening on port 3000')});
