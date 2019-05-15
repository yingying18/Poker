



    socket.on('be_startgame', function(data){
      

      gameSessionData.gamestartinsec = data.gamestartinsec;
      gameSessionData.gamestatus = data.gamestatus ;
      
      if (gameSessionData.gamestatus == 'inplay'){
          console.log("be_startgame inplay ");
          hideActionButtons("all");
          startGame();

      }else{
          console.log("be_startgame waiting ");
          //postData('post', 'lobby/showgame', data, 'updatableMiddleContainer',reseizeOpaqueDiv);
          //socket.emit('fe_userleft', gameSessionData);
          
          //console.log(gameSessionData.gamestatus);
          updateData(data);
          showActionButtons("generals");
          if (gameSessionData.gamestartinsec >=0){
             
            document.getElementById('gameinfotimer').innerHTML = "starts in "+ gameSessionData.gamestartinsec;
                if (gameSessionData.gamestartinsec % 2 ==0){
                     showgame(gameSessionData.tableid);
                        for (let i = 0 ; i< gameSessionData.users.length ; i++){
                if (typeof gameSessionData.seatstaken[gameSessionData.users[i]] !=='undefined')
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
          //console.log("front end refresh data called"+JSON.stringify(data));
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
  console.log(JSON.stringify(gameSessionData));
  socket.emit('fe_userleft', gameSessionData );

  postData('post', 'game/leavetablesession', data, 'updatableMiddleContainer',reseizeOpaqueDiv);


}
function updatedata(){
  
  socket.emit('socketUserAuthInfo', fe_updatedata );
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
        //console.log("socket.emit('fe_setEnvForSocket', gameSessionData);");
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
      
        waitForEl('#gameinfotimer', function() {
        
          socket.emit('fe_startgame', gameSessionData);
        
        });
         
    });

    socket.on('be_setDeck', function(data){


    });

    function starttic(){
      console.log("starttic");
      socket.emit('fe_dispatchTimerTick', gameSessionData);
      //console.log("----"+JSON.stringify(gameSessionData))
     
    };

    socket.on('be_dispatchTimerTick', function(data){
     
        gameSessionData.thistimer = data.thistimer;
        gameSessionData.userturn = data.userturn;
        gameSessionData.playedusers = data.playedusers;
        gameSessionData.calls = data.calls;
        
        
        if (gameSessionData.thistimer > 0){
            console.log("be_dispatchTimerTick data.thiis timer > 0");
            document.getElementById('usertimer'+gameSessionData.seatstaken[gameSessionData.userturn] ).innerHTML = gameSessionData.thistimer;
            starttic();

        }else if (gameSessionData.thistimer <= 0){
            
            console.log("be_dispatchTimerTick data.thiis timer <= 0");
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
       gameSessionData.deck = data.deck; 
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
      //gameSessionData.deck = data.deck;
      gameSessionData.gamestartinsec =  data.gamestartinsec;
      gameSessionData.gamestatus = data.gamestatus;

      gameSessionData.gamestatus = 'waiting';
      socket.emit('fe_startgame', gameSessionData);
     
    });

    socket.on('be_updateData', function(data){
        console.log("be_updateData");
        updateData(data);
        
    });
        let join = document.getElementsByName("join");
        let leave = document.getElementsByName("leave");
        let useraction = document.getElementsByName("userac");
    function hideActionButtons(option){
        let arr = null;

        if (option =="all"){
           arr = {1:join, 2:leave, 3:useraction};
        }
         if (option == "userac"){
          arr = {1:userac};
        }
        for (key in arr){
          for(let k = 0; k<arr[key].length;k++){
            arr[key][k].style.visibility = "hidden"; 
          }
        }



    }

    function showActionButtons(option){
        let arr = null;
        
        if (option =="all"){
           arr = {1:join, 2:leave, 3:useraction};
        }
         if (option == "useraction"){
          arr = {1:userac};
        }
         if (option == "generals"){
           arr = {1:join, 2:leave};
        }
        for (key in arr){
          for(let k = 0; k<arr[key].length;k++){
            arr[key][k].style.visibility = "show"; 
          }

        }



    }