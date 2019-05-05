

function checkgamesession() {
 
  console.log("checkgame session fe->be  startgame socket ");
  var data;
  console.log('checking started: '+usera);
  console.log("timer check : "+ timercheck);
  clearInterval(timercheck);
  
  socket.emit('fe_startgame');

}

function startcounter(time , functiontocall,user){
  usera = user;
  timercheck = setInterval(functiontocall, time);
 


}

function joingame(userid, seatno , tabledata){
  let data = {};
  data.userid = userid;
  data.seatno = seatno;
  data.tabledata = tabledata;
  //alert('join game : '+userid + ' seat no : '+ seatno + ' tableid : ' + JSON.stringify(tabledata));
  postData('post', 'game/joingamesession', data, 'updatableMiddleContainer',reseizeOpaqueDiv);
}

function leavegame(userid , gamesession){
  let data = {};
  data.userid = userid;
  data.gamesessionid = gamesession;
  //alert('leave game :'+ userid + 'gamesession' + gamesession);
  postData('post', 'game/leavetablesession', data, 'updatableMiddleContainer',reseizeOpaqueDiv);
}

function callgame(userid){

  alert('call game :'+userid);
}

function raisegame(userid){

  alert('raise game :'+userid);
}

function foldgame(userid){

  alert('fold game :'+userid);
}

//front end game socket calls

function callMe(){
    alert("hello world");
}

function createGame(){
    // Client-side socket creation
    console.log("create game function called");
   
    socket.emit('initCall', "client responded");

}


function sendAuthInfoToSocket(authuser){

  console.log("socket call : sendAuthInfoToSocket");
    console.log("socket disconnected");
    socket.emit('socketUserAuthInfo', authuser );

    
}

socket.on('be_startgame', function(data){
      //prepareDeck(data);
       prepareDeck();
       dealHands();
       
       
        //socket.disconnect();
});

socket.on('be_setDeck', function(data){
      //prepareDeck(data);
      // dealHands(data);
       
       
        //socket.disconnect();
});