const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fileUpload = require("express-fileupload");
app.set("view engine", "ejs");
app.set("views", "./views");
var fs = require("fs");
var session = require('express-session');
var multer = require("multer");
var upload = multer({ dest: "public/images/userimages/" });
var socket = require('socket.io');
//const login = require('./routes/login');
//const home = require('./routes/home');
//const main = require('./routes/main')(app);
//const howtoplay= require('./routes/howtoplay');
//const about = require('./routes/about');
//const game = require('./routes/game');
//const lobby = require('./routes/lobby');

//const userprofile = require('./routes/userprofile');

//const adminpanel = require('./routes/admin/adminpanel');

const dbconn = require("./utils/dbconn.js");
const dbRequest = require("./utils/dbrequest.js");

app.use(express.static("public",{
   maxAge: 150000000
}));

app.use(session({
  secret: 'secret_word', resave: false,
  saveUninitialized: true
}))

// Error 404
// TO-DO

//console.log('node enf'+process.env.NODE_ENV);
//console.log('env'+ app.get('env'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  console.log("app use : " + JSON.stringify(req.session));
  let sesdata = JSON.stringify(req.session);
  if (typeof req.session.userid !== 'undefined') {
    req.body.authanticate = "true";
  } else {
    req.body.authanticate = "false";
  }
  console.log(req.body.authanticate);
  next();
})


//app.use(fileUpload());

//app.use('/',main);
//app.use('/howtoplay',howtoplay);
//app.use('/about', about);
//app.use('/game', game);
//app.use('/lobby', lobby);
//app.use('/register', register);
//app.use('/userprofile', userprofile);
//app.use('/adminpanel', adminpanel);
//app.use('/login',login);
//app.use('/main',main);

//admin pages

//require('./routes/admin/user.js')(app,dbRequest,dbconn);
require("./routes/main.js")(app, dbRequest, dbconn);

require("./routes/game/howtoplay.js")(app, dbRequest, dbconn);
require("./routes/game/lobby.js")(app, dbRequest, dbconn);

require("./routes/admin/adminpanel.js")(app, dbRequest, dbconn);

require("./routes/user/login.js")(app, dbRequest, dbconn);
require("./routes/user/register.js")(app, dbRequest, dbconn, upload, fs);
require("./routes/user/userprofile.js")(app, dbRequest, dbconn);
require("./routes/about.js")(app, dbRequest, dbconn);

//require('./routes/register.js')(app,dbRequest,dbconn);
//require('./routes/howtoplay.js')(app,dbRequest,dbconn);
//require('./routes/admin/adminpanel.js')(app,dbRequest,dbconn);

app.use(function (req, res, next) {
  //console.log('example middleware');
  next();
});
var connectCounter = 0;

io.on('connection', function(socket){
  socket.on('connect', function() { connectCounter++; });
  socket.on('disconnect', function() { connectCounter--; });
  // console.log("connection established with total: " + connectCounter);

    socket.on('initCall', function(data){
      console.log("initCall called" + data);
      io.emit('testEvent', 'goodbye');
    });




    socket.on('send message', function(data){
      console.log("This is the message contents: " + data);
      //socket.broadcast.emit('relay message', data);
      console.log("connection established with total: " + connectCounter);
      io.emit('relay message', data);
    });

});
// Start listening on port 3000
server.listen(3000, () => {
  console.log("listening on port 3000");
});
