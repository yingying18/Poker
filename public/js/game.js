

function checkgamesession() {
 

  var data = {};
   console.log('checking started: '+usera);
  //postData('post', 'lobby/showgame/checkgamesession', data, 'updatableMiddleContainer',reseizeOpaqueDiv);

}

function startcounter(time , functiontocall,user){
  usera = user;
  timercheck = setInterval(functiontocall, time);
  console.log("timer check : "+ timercheck);


}

function joingame(userid, seatno , tabledata){
  var data = {};
  data.userid = userid;
  data.seatno = seatno;
  data.tabledata = tabledata;
  alert('join game : '+userid + ' seat no : '+ seatno + ' tableid : ' + JSON.stringify(tabledata));
  postData('post', 'game/joingamesession', data, 'updatableMiddleContainer',reseizeOpaqueDiv);
}

function leavegame(userid){

  alert('leave game :'+userid);
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