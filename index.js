const express = require("express");
const app = express();
//const server = require('http').createServer(app);
//const io = require('socket.io')(server);
const fileUpload = require("express-fileupload");
app.set("view engine", "ejs");
app.set("views", "./views");
var fs = require("fs");
var session = require('express-session');
var multer = require("multer");
var upload = multer({ dest: "public/images/userimages/" });
const socket = require('socket.io');
var poker = require('poker-hands');


const dbconn = require("./utils/dbconn.js");

const dbRequest = require("./utils/dbrequest.js");
app.timeout =0 ;
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
    if ((req.session.suspended == 0) &&(req.session.deleted ==0)){
    req.body.authanticate = "true";
    req.body.usertype = req.session.usertype;
   
    }else{
      req.body.authanticate = "false";
     console.log("xxxxxxxxx"+req.session.userid);
    }
    console.log("xxxxxxxxx"+req.session.usertype);
  } else {
    req.body.authanticate = "false";
    
  }
  console.log("authantication " +req.body.authanticate);
  console.log("authuser " +req.body.authuser);
  next();
})

//var cards = require('./public/js/cards.js');

//admin pages

//require('./routes/admin/user.js')(app,dbRequest,dbconn);
require("./routes/main.js")(app, dbRequest, dbconn);

require("./routes/game/howtoplay.js")(app, dbRequest, dbconn);
require("./routes/game/lobby.js")(app, dbRequest, dbconn);
require("./routes/game/game.js")(app, dbRequest, dbconn, poker);
require("./routes/admin/adminpanel.js")(app, dbRequest, dbconn);

require("./routes/user/login.js")(app, dbRequest, dbconn);
require("./routes/user/register.js")(app, dbRequest, dbconn, upload, fs);
require("./routes/user/userprofile.js")(app, dbRequest, dbconn);
require("./routes/about.js")(app, dbRequest, dbconn);


app.use(function (req, res, next) {
  //console.log('example middleware');
  next();
});

// Start listening on port 3000

var server = app.listen(3000, () => {
  console.log("listening on port 3000");
});
server.timeout =0 ;
require("./utils/serversocketgame.js")(server, socket,dbRequest, dbconn, poker);



