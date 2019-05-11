



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
  postData('post', 'game/joingamesession', data, 'updatableMiddleContainer',setEnvForSocket.bind(this,tabledata,userid));

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



    function setEnvForSocket(tabledata , userid ){
            
         console.log("-------------------fe socket call --> setEnvForSocket" + JSON.stringify(tabledata)+ " user: " +userid +JSON.stringify(userid)  );
         gameSessionData.thisuser = parseInt(userid);
         let tabledatatemp = (tabledata);
         gameSessionData.tableid = parseInt(tabledatatemp.table_id);

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
  console.log("be_setEnvForSocket -> socket data :"+ JSON.stringify(data));
  console.log("be_setEnvForSocket -> local data :"+ JSON.stringify(gameSessionData));
      
      
        
});

socket.on('be_setDeck', function(data){


});