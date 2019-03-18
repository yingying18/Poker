


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
            url: "/"+urlaction,
            data: JSON.stringify(senddata),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
            console.log('success');
                console.log('success post data');
                            //console.log(JSON.stringify(data));
                            //alert(resultdiv);
                            document.getElementById(destinationdiv).innerHTML=data;
            }
        });
};

function gotoMenu(method,urlaction,data, destinationdiv){
      
       console.log('gotmenu called');
       postData("post","gotomenu/users","","updatableMiddleContainer");
     
};



