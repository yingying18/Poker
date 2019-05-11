



function startcounter(time , functiontocall,user){
  usera = user;
  //alert(startgametimercheck);
  startgametimercheck = setInterval(functiontocall, time);
 

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
      console.log("timer check : "+ startgametimercheck);
      clearInterval(startgametimercheck);
      startgametimercheck =null;
      
      //socket.emit('fe_startgame');

    }

    function createGame(){
        // Client-side socket creation
        console.log("-------------------fe socket call --> createGame"  );
       
        socket.emit('initCall', "client responded");

    }


    function sendAuthInfoToSocket(sesionuser){

      console.log("-------------------fe socket call --> sendAuthInfoToSocket" + JSON.stringify(sesionuser) );
       
        socket.emit('socketUserAuthInfo', sesionuser );

        
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
    
       if ((key !== 'thisuser' ) && (key !== 'thissocketid' ) && (key !== 'thiscards' ) && (key !== 'thisbet' ) && (key !== 'thisseatno')){
          if ((key === 'usersbet') || (key === 'seatstaken') ||  (key === 'seatstaken') || (key === 'socketids') || (key === 'usercards' )){
              gameSessionData[key] = data[key];
          }else{
              gameSessionData[key] = data[key];
          }
        }
  
  });
  console.log("be_setEnvForSocket -> socket data :"+ JSON.stringify(data));
  console.log("be_setEnvForSocket -> local data :"+ JSON.stringify(gameSessionData));
 
  //socket.emit('fe_checkTimerStarter', gameSessionData);
  if (gameSessionData.thisuser == gameSessionData.userturn){
    if (userturntimercheck == null){
      userturntimercheck = setInterval(starttic, 2000);  
    }
  }else {
    if (userturntimercheck == null){
      userturntimercheck = setInterval(starttic, 2000);  
    }
    if (! (gameSessionData.users.includes(gameSessionData.thisuser))){
        //dealcards(gameSessionData);
    }

  }
     
        
});

socket.on('be_setDeck', function(data){


});

function starttic(){
//alert(gameSessionData.thisseatno);
  console.log('server ischecking who plays');
        //document.getElementById('usertimer'+gameSessionData.seatstaken[gameSessionData.userturn]  ).innerHTML = --gameSessionData.thistimer;
        socket.emit('fe_dispatchTimerTick', gameSessionData);
        console.log("data timer check:-->"+gameSessionData.thistimer);

  
};

    socket.on('be_dispatchTimerTick', function(data){
      gameSessionData.calls = data.calls;
       gameSessionData.thistimer = data.thistimer;
      if (data.thistimer > 0){
       
        console.log("timer update returnde :" +data.thisuser);
        document.getElementById('usertimer'+gameSessionData.seatstaken[gameSessionData.userturn] ).innerHTML = gameSessionData.thistimer;
     }else if (data.thistimer == 0){
        document.getElementById('usertimer'+gameSessionData.seatstaken[gameSessionData.userturn] ).innerHTML = gameSessionData.thistimer;
        clearInterval(userturntimercheck);
        userturntimercheck = null;
        //gameSessionData.thistimer = 5;
        //if (gameSessionData.thisuser == gameSessionData.userturn){
        socket.emit('fe_dealcards', gameSessionData);
        
        socket.emit('fe_switchToNetUser', gameSessionData);
        
     }

      
    });


    socket.on('be_dealcards', function(data){

      dealcards(data);



      
    });


    function dealcards(data){
                console.log(JSON.stringify(data));
          gameSessionData.deck = data.deck;
          gameSessionData.usercards = data.usercards;
          gameSessionData.usersbet = data.usersbet;
          gameSessionData.tablemoney = data.tablemoney; 
          //alert(countJson(data.usercards));
          let cards = "";

          console.log("be_dealcards :" +data.thisuser);
          for (let i = 0 ; i< gameSessionData.users.length ; i++){
            document.getElementById('card'+gameSessionData.seatstaken[gameSessionData.users[i]] ).innerHTML = "";
          }
          for (let i = 0 ; i< gameSessionData.users.length ; i++){
            console.log("cards : "+ data.usercards[gameSessionData.users[i]]);
            cards = data.usercards[gameSessionData.users[i]];
            console.log(cards);
            for (let k = 0 ; k< cards.length ; k++){
              document.getElementById('card'+gameSessionData.seatstaken[gameSessionData.users[i]] ).innerHTML +=  "<img width=\"24\" height=\"34\" src=\"images/deck1/"+cards[k]+".jpg\" >" ;
            }
          }
          //userturntimercheck 
          
    }

    socket.on('be_switchToNetUser', function(data){
      gameSessionData.userturn = data.userturn;
      gameSessionData.thistimer = data.thistimer;
      if ((userturntimercheck == null) ){
        userturntimercheck = setInterval(starttic, 2000);  
      }
      //dealcards(gameSessionData);
      //alert("be_switchToNetUse : "+userturntimercheck);
       

     



      
    });

    function countJson(obj) {
      var count=0;
        for(var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
             ++count;
          }
        }
      return count;
    }