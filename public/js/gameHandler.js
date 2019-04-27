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


function sendMessage(){
    var socket = io.connect('http://localhost:3000');
    var message = document.getElementById("chatinputbox").value;
    document.getElementById("chatinputbox").value = "";
    console.log(message);

    socket.emit('send message', message);
    socket.on('relay message', function(data){
        console.log("This is the data: ");
        var content = "";
        content = document.getElementById('chat').innerHTML;
        document.getElementById('chat').innerHTML = content + "<br>" + data;
        socket.disconnect();
        //document.getElementById('chat').innerHTML = "<br>" + data;
    });
}