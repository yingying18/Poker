
function callMe(){
    alert("hello world");
}

function createGame(){
    // Client-side socket creation
    console.log("create game function called");
    var socket = io.connect('http://localhost:3000');
    socket.emit('initCall', "client responded");
    socket.on('testEvent', function(data){
        socket.disconnect();
    });
}


function sendAuthInfoToSocket(authuser){

	console.log("socket call : sendAuthInfoToSocket");
    console.log("socket disconnected");
    socket.emit('socketUserAuthInfo', authuser );

    
}

socket.on('be_startgame', function(data){
      
       prepareDeck();
       dealHands();
       
       
        //socket.disconnect();
    });