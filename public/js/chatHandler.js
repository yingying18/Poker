// var socketChatGlobal = io.connect('http://localhost:3000');

function sendMessage(user){
    
    
    
    var message = document.getElementById("chatinputbox").value;
    
    document.getElementById("chatinputbox").value = "";

    socket.emit('send message',user +" :" +message);

    console.log("socket disconnected");
}

socket.on('relay message', function(data){
      
       
       
        document.getElementById('chat').innerHTML +=  "<br>" + data;
        //socket.disconnect();
    });