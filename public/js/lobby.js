
var intervalchekbegining = null;
function showgame(tableid,authuser) {
 

  var data = {};
  var senddata ={};
  data.tableid = tableid;
  
  //gameSessionData.tableid = tableid;

  postData('post', 'lobby/showgame', data, 'updatableMiddleContainer',reseizeOpaqueDiv);


  
/*
    if ((typeof intervalchekbegining === 'undefined') || (intervalchekbegining == null)){  
      
       intervalchekbegining = setInterval(function(data){

          postDataReturn('post', '/game/checksessionexist', data,function(returneddata){
          		console.log("show after waiting calback"+JSON.stringify(returneddata));
          		if (returneddata.length> 0){
          			
          			clearInterval(intervalchekbegining);
          			intervalchekbegining == null;
          			//data.tableid = returneddata.table_id;
          			console.log("checking senddata"+JSON.stringify(data));
          			   
                   postDataReturn('post', '/game/getThisTable', data,function(returnetabledata){
                    console.log("call set end ***********"+JSON.stringify(returnetabledata));

                     console.log("auth user***********");
                      console.log("auth user***********");
                       console.log("auth user***********");
                        console.log("auth user***********");
                         console.log("auth user***********");
                          console.log("auth user***********");
                           console.log("auth user***********");
                            console.log("auth user***********");
                             console.log("auth user***********");
                     
                       postData('post', 'lobby/showgame', data, 'updatableMiddleContainer',function(){
                             console.log("call set end ***********"+JSON.stringify(authuser));
                             console.log("call set end *********** table data"+JSON.stringify(returnetabledata));
                            console.log("callback for set auth info ------------------------");

                          sendAuthInfoToSocket((authuser));
                          
                          setEnvForSocket((returnetabledata[0]),authuser.userid,null);
                         
                          showgame(<%= result[i].table_id %>,'<%= JSON.stringify(authuser) %>');
                          sendAuthInfoToSocket('<%= JSON.stringify(authuser) %>');
                          setEnvForSocket(<%= JSON.stringify(result[i]) %>,'<%= authuser.userid%>', null);">

                       });
                   
                    
                     
                  })
               
                
          		}

          })

       },1000,data);

    }
  
    console.log("---------------------------------------------------------");
  console.log("--------------------------------------------------------- game.js");
  console.log("---------------------------------------------------------"+JSON.stringify(gameSessionData));
*/
}

function sendAuthToSocket(authuser){
    // var socket = io.connect('http://localhost:3000');
    //socket = socketChatGlobal;

    var message = document.getElementById("chatinputbox").value;
    
    document.getElementById("chatinputbox").value = "";

    socket.emit('send message',user +" :" +message);

    console.log("socket disconnected");
}
