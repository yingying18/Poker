// var socketChatGlobal = io.connect('http://localhost:3000');
var socket = io.connect('http://localhost:3000');
function sendMessage(){
    // var socket = io.connect('http://localhost:3000');
    //socket = socketChatGlobal;

    var message = document.getElementById("chatinputbox").value;
    document.getElementById("chatinputbox").value = "";

    socket.emit('send message', message);
    socket.on('relay message', function(data){
        var content = "";
        content = document.getElementById('chat').innerHTML;
        document.getElementById('chat').innerHTML = content + "<br>" + data;
        //socket.disconnect();
    });
    console.log("socket disconnected");
}