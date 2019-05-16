

  let refreshcontrol = 0;

    socket.on('be_startgame', function(data){
        console.log("be_startgame");
      console.log(gameSessionData.gamestatus);
      gameSessionData.gamestartinsec = data.gamestartinsec;
      gameSessionData.gamestatus = data.gamestatus ;
      
      if (gameSessionData.gamestatus == 'inplay'){
          console.log("be_startgame inplay ");
         
               let leave = document.getElementsByName("leave");
               for (let k = 0 ; k < leave.length ; k++){
                leave[k].style.visibility = "hidden"; 
               }
               let join = document.getElementsByName("join");
               for (let k = 0 ; k < join.length ; k++){
                join[k].style.visibility = "hidden"; 
               }
             
            
          startGame();

      }else if (gameSessionData.gamestatus == 'waiting'){
        console.log("  --- >0" + (gameSessionData.gamestartinsec));
              let useractionbuttons = document.getElementsByName("userac");
               for (let k = 0 ; k < useractionbuttons.length ; k++){
                useractionbuttons[k].style.visibility = "hidden"; 
               }
          console.log("be_startgame waiting ");
          console.log(gameSessionData.gamestatus);
          //postData('post', 'lobby/showgame', data, 'updatableMiddleContainer',reseizeOpaqueDiv);
          //socket.emit('fe_userleft', gameSessionData);
          
          //console.log(gameSessionData.gamestatus);
          updateData(data);
          
                  if (gameSessionData.gamestartinsec >0){
                    console.log("  --- >0" + (gameSessionData.gamestartinsec));
                       showActionButtons("generals");

                     
                    document.getElementById('gameinfotimer').innerHTML = "starts in "+ gameSessionData.gamestartinsec;
                        
                        if (gameSessionData.gamestartinsec <= 5){
                            
                                
                        }
/*
                        else if (gameSessionData.gamestartinsec >= 1){
                            showgame(gameSessionData.tableid);

                        }
                    */
                     
                  }else{
                    for (let i = 0 ; i< gameSessionData.users.length ; i++){
                                  if (typeof gameSessionData.seatstaken[gameSessionData.users[i]] !=='undefined'){
                                    document.getElementById('card'+gameSessionData.seatstaken[gameSessionData.users[i]] ).innerHTML = "";
                                    }
                                }
                        document.getElementById('housecards').innerHTML = "";
                      console.log("______________________ wait game not >= 0 ")
                     showgame(gameSessionData.tableid);
                    document.getElementById('gameinfotimer').innerHTML = gameSessionData.gamestatus;
                    startGame();
                  
                  }
                             

      }

    });

    function updateData(data){
       console.log("updateData");
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
function updatedatacallserver(){
  
  socket.emit('fe_updatedata', data );
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
        console.log("startGame");
      document.getElementById('gameinfotimer').innerHTML = gameSessionData.gamestatus;
      starttic(gameSessionData);

    }


    function sendAuthInfoToSocket(sesionuser){
 console.log("sendAuthInfoToSocket");
        socket.emit('socketUserAuthInfo', sesionuser );
        
    }



    function setEnvForSocket(tableid , userid ,seatno){
         console.log("setEnvForSocket");
        gameSessionData.thisuser = parseInt(userid);
        gameSessionData.tableid = parseInt(tableid.table_id);
        
        if ((typeof seatno !== 'undefined') && (seatno !== "")){
          gameSessionData.thisseatno = parseInt(seatno);
        }

        socket.emit('fe_setEnvForSocket', gameSessionData);
        //console.log("socket.emit('fe_setEnvForSocket', gameSessionData);");
    }



    function prepareDeck(){
        console.log("prepareDeck");
        socket.emit('fe_setDeck', gameSessionData);

    }


    socket.on('be_setEnvForSocket', function(data){
    console.log("be_setEnvForSocket");

        Object.keys(data).forEach(function(key){
          
             if ((key !== 'thisuser' ) && (key !== 'thissocketid' ) && (key !== 'thiscards' ) && (key !== 'thisbet' ) && (key !== 'thisseatno')){

                    gameSessionData[key] = data[key];

              }
        
        });
      
        waitForEl('#gameinfotimer', function() {
          console.log("aitForEl('#gameinfotimer'");
          socket.emit('fe_startgame', gameSessionData);
        
        });
         
    });

    socket.on('be_setDeck', function(data){


    });

    function starttic(data){
      console.log("starttic" + data.gamestatus);
      if (data.gamestatus != "deciding")
      socket.emit('fe_dispatchTimerTick', data);
      //console.log("----"+JSON.stringify(gameSessionData))
     
    };

    socket.on('be_dispatchTimerTick', function(data){
     console.log("be_dispatchTimerTick");
        gameSessionData.thistimer = data.thistimer;
        gameSessionData.userturn = data.userturn;
        gameSessionData.playedusers = data.playedusers;
        gameSessionData.calls = data.calls;
        
        if (gameSessionData.thisuser == gameSessionData.userturn){
              let useractionbuttons = document.getElementsByName("userac");
               for (let k = 0 ; k < useractionbuttons.length ; k++){
                useractionbuttons[k].style.visibility = "visible"; 
               }
        }else{
            let useractionbuttons = document.getElementsByName("userac");
               for (let k = 0 ; k < useractionbuttons.length ; k++){
                useractionbuttons[k].style.visibility = "hidden"; 
               }
        }
        if (gameSessionData.thistimer > 0){
            console.log("be_dispatchTimerTick data.thiis timer > 0");

            document.getElementById('usertimer'+gameSessionData.seatstaken[gameSessionData.userturn] ).innerHTML = gameSessionData.thistimer;
            starttic(gameSessionData);

        }else if (gameSessionData.thistimer <= 0){
            refreshcontrol ==0;
          
            console.log("be_dispatchTimerTick data.thiis timer <= 0");
            document.getElementById('usertimer'+gameSessionData.seatstaken[gameSessionData.userturn] ).innerHTML = gameSessionData.thistimer;
            socket.emit('fe_switchToNetUser', gameSessionData);

        }
      
    });


    socket.on('be_dealcards', function(data){
        console.log("be_dealcards");
      dealcards(data,function(data){
        starttic(data)
      });
      
      
    });




    function dealcards(data){
         console.log("dealcards");
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
              if ((gameSessionData.thisuser == gameSessionData.users[i]) || (k == 0 || k==1) ){
                document.getElementById('card'+gameSessionData.seatstaken[gameSessionData.users[i]] ).innerHTML +=  "<img width=\"24\" height=\"34\" src=\"images/deck1/"+cards[k]+".jpg\" >" ;
              }else{
                  document.getElementById('card'+gameSessionData.seatstaken[gameSessionData.users[i]] ).innerHTML +=  "<img width=\"24\" height=\"34\" src=\"images/deck1/Card_Back.jpg\" >" ;               
              }
            }

          }
          cards = gameSessionData.housecards;
          for (let i = 0 ; i< cards.length ; i++){
            if (i<2){
              document.getElementById('housecards').innerHTML +=  "<img width=\"24\" height=\"34\" src=\"images/deck1/"+cards[i]+".jpg\" >" ;
            }else{
              document.getElementById('housecards').innerHTML +=  "<img width=\"24\" height=\"34\" src=\"images/deck1/Card_Back.jpg\" >" ;               
            }
          }
         
          
    }

    socket.on('be_switchToNetUser', function(data){
      console.log("be_switchToNetUser");
      gameSessionData.userturn = data.userturn;
      gameSessionData.thistimer = data.thistimer;
      starttic(gameSessionData);
     
    });

    function cycleover (data){
        console.log("cycleover");
        socket.emit('fe_dealcards', gameSessionData);
        socket.emit('fe_incrementcycle', gameSessionData);

    }

    socket.on('be_cycleover', function(data){
       console.log("be_cycleover");
       gameSessionData.deck = data.deck; 
       cycleover(data);
   
    });

    socket.on('be_incrementcycle', function(data){
         console.log("be_incrementcycle -->"+data.gamestatus);
      gameSessionData.cycle = data.cycle;
      gameSessionData.playedusers = data.playedusers;
      gameSessionData.gamestatus = data.gamestatus;
      starttic(gameSessionData);
   
    });

      socket.on('be_executedeciding', function(data, winnerresult){
         console.log("be_executedeciding -->"+data.gamestatus);
         gameSessionData.gamestatus = "waiting";
         for (let i = 0 ; i< gameSessionData.users.length ; i++){
            document.getElementById('card'+gameSessionData.seatstaken[gameSessionData.users[i]] ).innerHTML = "";
          }

          document.getElementById('housecards').innerHTML = "";
          
         socket.emit('fe_startgame', gameSessionData);
    
   
    });
    socket.on('be_showwinner', function( winnerresult){
        
          document.getElementById('tablebet').innerHTML = "winner " +  winnerresult;
         
    
   
    });

    socket.on('be_sessionover', function(data){
      gameSessionData.gamestatus = data.gamestatus;
      document.getElementById('gameinfotimer').innerHTML = gameSessionData.gamestatus + " the winner ";
        showAllCards(gameSessionData);
        console.log("be_sessionover");
        console.log("be_sessionover");
        console.log("be_sessionover");
        console.log("be_sessionover");
        console.log("be_sessionoverv data" + data.gamestatus);
         console.log("be_sessionover" + JSON.stringify(gameSessionData));

          socket.emit('fe_executedeciding', data,gameSessionData);
        /*
        
      gameSessionData.cycle = data.cycle;
      gameSessionData.playedusers = data.playedusers;
      gameSessionData.usercards = data.usercards;
      gameSessionData.housecards = data.housecards;
      //gameSessionData.deck = data.deck;
      gameSessionData.gamestartinsec =  data.gamestartinsec;
      gameSessionData.gamestatus = data.gamestatus;
  */
      //gameSessionData.gamestatus = 'waiting';
      //socket.emit('fe_startgame', gameSessionData);
     
    });

    function showAllCards(data){
      console.log(JSON.stringify(data));
      for (let i = 0 ; i< data.users.length ; i++){
          document.getElementById('card'+data.seatstaken[data.users[i]] ).innerHTML ="";
            cards = data.usercards[data.users[i]];
            for (let k = 0 ; k< cards.length ; k++){
              document.getElementById('card'+data.seatstaken[data.users[i]] ).innerHTML +=  "<img width=\"24\" height=\"34\" src=\"images/deck1/"+cards[k]+".jpg\" >" ;
            }

          }
          document.getElementById('housecards').innerHTML = "";
           cards = data.housecards;
          for (let i = 0 ; i< cards.length ; i++){
            document.getElementById('housecards').innerHTML +=  "<img width=\"24\" height=\"34\" src=\"images/deck1/"+cards[i]+".jpg\" >" ;
          }
        
    }

    socket.on('be_updateData', function(data){
        console.log("be_updateData");
        updateData(data);
        
    });
       
    function hideActionButtons(option){
       var join = document.getElementsByName("join");
        var leave = document.getElementsByName("leave");
        var useraction = document.getElementsByName("userac");
        var arr = null;

        if (option =="all"){
           arr = {1:join, 2:leave, 3:useraction};
        }
         if (option == "userac"){
          arr = {1:useraction};
        }
        for (key in arr){
          for(let k = 0; k<arr[key].length;k++){
            arr[key][k].style.visibility = "hidden"; 
          }
        }



    }

    function showActionButtons(option){
       var join = document.getElementsByName("join");
        var leave = document.getElementsByName("leave");
        var useraction = document.getElementsByName("userac");
        var arr = null;
        
        if (option =="all"){
           arr = {1:join, 2:leave, 3:useraction};
        }
         if (option == "userac"){
          arr = {1:useraction};
        }
         if (option == "generals"){
           arr = {1:join, 2:leave};
        }
        for (key in arr){
          for(let k = 0; k<arr[key].length;k++){
            //console.log(arr[key][k]);
            arr[key][k].style.visibility = "visible"; 
          }

        }



    }