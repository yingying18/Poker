



function startcounter(time , functiontocall,user){
  usera = user;
  timercheck = setInterval(functiontocall, time);
 


}

function joingame(userid, seatno , tabledata){
  let data = {};
  data.userid = userid;
  data.seatno = seatno;
  data.tabledata = tabledata;
  alert('join game : '+userid + ' seat no : '+ seatno + ' tableid : ' + JSON.stringify(tabledata));
  postData('post', 'game/joingamesession', data, 'updatableMiddleContainer',setEnvForSocket.bind(this,tabledata,userid, seatno));

}

function leavegame(userid , gamesession){
  let data = {};
  data.userid = parseInt(userid);
  data.gamesessionid = parseInt(gamesession);
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

function timerdeduct(){

}
//front end socket calls

    function checkgamesession() {
     
      console.log("checkgame session fe->be  startgame socket ");
      var data;
      console.log('checking started: '+usera);
      console.log("timer check : "+ timercheck);
      clearInterval(timercheck);
      
      //socket.emit('fe_startgame');

    }

    function createGame(){
        // Client-side socket creation
        console.log("-------------------fe socket call --> createGame"  );
       
        socket.emit('initCall', "client responded");

    }


    function sendAuthInfoToSocket(authuser){

      console.log("-------------------fe socket call --> sendAuthInfoToSocket" + JSON.stringify(authuser) );
       
        socket.emit('socketUserAuthInfo', authuser );

        
    }



    function setEnvForSocket(tableid , userid ,seatno){
      console.log("err ------->"+(tableid));
       
         // tabledata = JSON.parse(tabledata); 
       
        console.log("-------------------fe socket call --> setEnvForSocket" + JSON.stringify(gameSessionData)  );
        gameSessionData.thisuser = parseInt(userid);
        
        gameSessionData.tableid = parseInt(tableid);
        
        if ((typeof seatno !== 'undefined') && (seatno !== "")){
           gameSessionData.thisseatno = parseInt(seatno);
        }

         socket.emit('fe_setEnvForSocket', gameSessionData);

    }

    function startGame(){
       
         console.log("fe socket call --> startgame" + JSON.stringify(gameSessionData));
         socket.emit('fe_startGame', gameSessionData);

    }

    function prepareDeck(){
        console.log("fe socket call --> prepareDeck" + JSON.stringify(gameSessionData));
        socket.emit('fe_setDeck', gameSessionData);

    }



    function dealHands(data){


    }

//receive from server socket
socket.on('be_setEnvForSocket', function(data){
  Object.keys(data).forEach(function(key){
   console.log(key + '=' + data[key]);
   if ((key !== 'thisuser' ) && (key !== 'thissocketid' ) && (key !== 'thiscards' ) && (key !== 'thisbet' )){
      if ((key === 'usersbet') || (key === 'seatstaken') || (key === 'users') || (key === 'usercards') || (key === 'socketids') || (key === 'usersinsocketroom' )){
          gameSessionData[key] = (data[key]);
      }else{
          gameSessionData[key] = data[key];
      }

          

      
  }
});
  console.log("be_setEnvForSocket -> socket data :"+ JSON.stringify(data));
  console.log("be_setEnvForSocket -> local data :"+ JSON.stringify(gameSessionData));
 
 socket.emit('fe_checkTimerStarter', gameSessionData);
      
      
        
});

socket.on('be_setDeck', function(data){


});

socket.on('be_checkplaystatus', function(){
//alert(gameSessionData.thisseatno);
  console.log('server ischecking who plays');
 
   
      if (gameSessionData.thisuser === gameSessionData.userturn){
        document.getElementById('usertimer'+gameSessionData.thisseatno ).innerHTML = --gameSessionData.thistimer;
      }else{
        let findseat = gameSessionData.seatstaken;
        let findseatlen=(gameSessionData.seatstaken).length;
        console.log("seat len "+findseatlen);
        console.log("seat len "+JSON.stringify(gameSessionData.seatstaken));
          for (let i =0 ; i < findseatlen ; i ++){
              console.log(findseat[i].userid);
              if (findseat[i].userid === gameSessionData.userturn) {
                  document.getElementById('usertimer'+findseat[i].seatno ).innerHTML = --gameSessionData.thistimer;
                  break;
              }
          }
      }
    
  
  
});
