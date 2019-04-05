


//method : post,get,put,delete
//urlaction: link to catch request
function postData(method,urlaction,data, destinationdiv){
      
      console.log('data post called');
     
     let senddata={};
    if ( (typeof data !== 'undefined') && (data !== '') ){
      senddata = data;
    }
    
   
     $.ajax({
            type: method,
            url: urlaction,
            data: JSON.stringify(senddata),
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                console.log('success: data sent ');
                document.getElementById(destinationdiv).innerHTML=data;
            }
        });
};

function gotoMenu(method,urlaction,data, destinationdiv){
      
       console.log('gotomenu called');
       //postData("post","gotomenu/users","","updatableMiddleContainer");

       postData(method,urlaction,data,destinationdiv);
       

     
};



