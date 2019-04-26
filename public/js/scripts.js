// Empty JS for your own code to be here
    jQuery(function($){
        var socket = io.connect('http://localhost:3000');
        var $messageForm = $('#send-message');
        var $messageBox = $('#message');
        var $chat = $('#chat');
        
        var $sendnewsForm = $('#send-news');

        var $insideSendForm = $('#send-inside');
        var $messageinsideBox = $('#messageinside');

        var $insidePrintForm = $('#print-inside');

        //sending to server to be sent back
        $messageForm.submit(function(e){

            console.log("submit called before");
            e.preventDefault();
            socket.emit('send message', $messageBox.val());
            $messageBox.val('');
            console.log("submit called after");
        });

        //from io.emit('new message')
        socket.on('new message', function(data){
            $chat.append(data + "<br/>");
            console.log("new message recieved");
        });


        //sending to server to be printed to console and not sent back
        $sendnewsForm.submit(function(e){
            e.preventDefault();
            socket.emit('news', "hello");
            console.log("page reload");
        });

        //sending to server to be sent back (inside middle div)
        $insideSendForm.submit(function(e){
            e.preventDefault();
            socket.emit('inside send', "hello to send inside");
            //socket.emit('inside send', $messageinsideBox.val());
            $messageinsideBox.val('');
            console.log("submit called after");
        });

        //
        socket.on('inside response', function(data){
          console.log("inside recieved this: " + data);
        });

        //sending to server to be printed to console (inside middle div)
        $insidePrintForm.submit(function(e){
          e.preventDefault();
          socket.emit('inside send', "hello to print inside");
        });



    });