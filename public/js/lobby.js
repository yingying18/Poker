

function showgame(tableid) {
 

  var data = {};

  data.tableid = tableid;
  


  postData('post', 'lobby/showgame', data, 'updatableMiddleContainer',reseizeOpaqueDiv);

}

function sendAuthToSocket(authuser){
    // var socket = io.connect('http://localhost:3000');
    //socket = socketChatGlobal;

    var message = document.getElementById("chatinputbox").value;
    
    document.getElementById("chatinputbox").value = "";

    socket.emit('send message',user +" :" +message);

    console.log("socket disconnected");
}
