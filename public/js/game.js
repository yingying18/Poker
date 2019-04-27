

function checkgamesession() {
 

  let data = {};
   console.log('checking started: '+usera);
  //postData('post', 'lobby/showgame/checkgamesession', data, 'updatableMiddleContainer',reseizeOpaqueDiv);

}

function startcounter(time , functiontocall,user){
  usera = user;
  timercheck = setInterval(functiontocall, time);
  console.log("timer check : "+ timercheck);


}

function joingame(userid, seatno , tabledata){
  let data = {};
  data.userid = userid;
  data.seatno = seatno;
  data.tabledata = tabledata;
  alert('join game : '+userid + ' seat no : '+ seatno + ' tableid : ' + JSON.stringify(tabledata));
  postData('post', 'game/joingamesession', data, 'updatableMiddleContainer',reseizeOpaqueDiv);
}

function leavegame(userid , gamesession){
  let data = {};
  data.userid = userid;
  data.gamesessionid = gamesession;
  alert('leave game :'+ userid + 'gamesession' + gamesession);
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