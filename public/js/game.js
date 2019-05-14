



    socket.on('be_startgame', function(data){

      gameSessionData.gamestartinsec = data.gamestartinsec;
      gameSessionData.gamestatus = data.gamestatus ;
     
      if (gameSessionData.gamestatus == 'inplay'){

          startGame();

      }else{
          updateData(data);
          if (gameSessionData.gamestartinsec >=0){
             
            document.getElementById('gameinfotimer').innerHTML = "starts in "+ gameSessionData.gamestartinsec;
                if (gameSessionData.gamestartinsec == 5){
                        for (let i = 0 ; i< gameSessionData.users.length ; i++){
                document.getElementById('card'+gameSessionData.seatstaken[gameSessionData.users[i]] ).innerHTML = "";
                }
                document.getElementById('housecards').innerHTML = "";
            }
          
          }else{
          
            document.getElementById('gameinfotimer').innerHTML = gameSessionData.gamestatus;
            startGame();
          
          }

      }

    });

    function updateData(data){

          Object.keys(data).forEach(function(key){
          
             if ((key !== 'thisuser' ) && (key !== 'thissocketid' ) && (key !== 'thiscards' ) && (key !== 'thisbet' ) && (key !== 'thisseatno')){

                    gameSessionData[key] = data[key];

              }
        
        });
    }

function joingame(userid, seatno , tabledata){

  let data = {};
  data.userid = userid;
  data.seatno = seatno;
  data.tabledata = tabledata;
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



//front end socket calls
    function startGame(){
       
      document.getElementById('gameinfotimer').innerHTML = gameSessionData.gamestatus;
      starttic();

    }


    function sendAuthInfoToSocket(sesionuser){

        socket.emit('socketUserAuthInfo', sesionuser );
        
    }



    function setEnvForSocket(tableid , userid ,seatno){

        gameSessionData.thisuser = parseInt(userid);
        gameSessionData.tableid = parseInt(tableid.table_id);
        
        if ((typeof seatno !== 'undefined') && (seatno !== "")){
          gameSessionData.thisseatno = parseInt(seatno);
        }

        socket.emit('fe_setEnvForSocket', gameSessionData);
        console.log("socket.emit('fe_setEnvForSocket', gameSessionData);");
    }



    function prepareDeck(){

        socket.emit('fe_setDeck', gameSessionData);

    }



    socket.on('be_setEnvForSocket', function(data){
    

        Object.keys(data).forEach(function(key){
          
             if ((key !== 'thisuser' ) && (key !== 'thissocketid' ) && (key !== 'thiscards' ) && (key !== 'thisbet' ) && (key !== 'thisseatno')){

                    gameSessionData[key] = data[key];

              }
        
        });

         socket.emit('fe_startgame', gameSessionData);

            
    });

    socket.on('be_setDeck', function(data){


    });

    function starttic(){

      socket.emit('fe_dispatchTimerTick', gameSessionData);
     
    };

    socket.on('be_dispatchTimerTick', function(data){
     
        gameSessionData.thistimer = data.thistimer;
        gameSessionData.userturn = data.userturn;
        gameSessionData.playedusers = data.playedusers;
        gameSessionData.calls = data.calls;
        
        
        if (gameSessionData.thistimer > 0){

            document.getElementById('usertimer'+gameSessionData.seatstaken[gameSessionData.userturn] ).innerHTML = gameSessionData.thistimer;
            starttic();

        }else if (gameSessionData.thistimer <= 0){
            
            console.log("data.thiis timer == 0");
            document.getElementById('usertimer'+gameSessionData.seatstaken[gameSessionData.userturn] ).innerHTML = gameSessionData.thistimer;
            socket.emit('fe_switchToNetUser', gameSessionData);

        }
      
    });


    socket.on('be_dealcards', function(data){
       
      dealcards(data);
      starttic();
      
    });




    function dealcards(data){

          gameSessionData.deck = data.deck;
          gameSessionData.usercards = data.usercards;
          gameSessionData.usersbet = data.usersbet;
          gameSessionData.housecards = data.housecards;
          gameSessionData.tablemoney = data.tablemoney; 
          let cards = "";

          for (let i = 0 ; i< gameSessionData.users.length ; i++){
            document.getElementById('card'+gameSessionData.seatstaken[gameSessionData.users[i]] ).innerHTML = "";
          }

          document.getElementById('housecards').innerHTML = "";
          for (let i = 0 ; i< gameSessionData.users.length ; i++){

            cards = data.usercards[gameSessionData.users[i]];
            for (let k = 0 ; k< cards.length ; k++){
              document.getElementById('card'+gameSessionData.seatstaken[gameSessionData.users[i]] ).innerHTML +=  "<img width=\"24\" height=\"34\" src=\"images/deck1/"+cards[k]+".jpg\" >" ;
            }

          }
          cards = gameSessionData.housecards;
          for (let i = 0 ; i< cards.length ; i++){
            document.getElementById('housecards').innerHTML +=  "<img width=\"24\" height=\"34\" src=\"images/deck1/"+cards[i]+".jpg\" >" ;
          }
          starttic();
          
    }

    socket.on('be_switchToNetUser', function(data){

      gameSessionData.userturn = data.userturn;
      gameSessionData.thistimer = data.thistimer;
      starttic();
     
    });

    function cycleover (data){

        socket.emit('fe_dealcards', gameSessionData);
        socket.emit('fe_incrementcycle', gameSessionData);

    }

    socket.on('be_cycleover', function(data){
        
       cycleover(data);
   
    });

    socket.on('be_incrementcycle', function(data){
        
      gameSessionData.cycle = data.cycle;
      gameSessionData.playedusers = data.playedusers;
      starttic();
   
    });

    socket.on('be_sessionover', function(data){
        
      gameSessionData.cycle = data.cycle;
      gameSessionData.playedusers = data.playedusers;
      gameSessionData.usercards = data.usercards;
      gameSessionData.housecards = data.housecards;
      gameSessionData.gamestartinsec =  data.gamestartinsec;
      gameSessionData.gamestatus = data.gamestatus;

      gameSessionData.gamestatus = 'waiting';
      socket.emit('fe_startgame', gameSessionData);
     
     
     
   
    });
