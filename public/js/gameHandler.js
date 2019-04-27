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


