


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

       postData(method,urlaction,data,destinationdiv);
       

     
};


function hideDiv(divtohide){

  let vardiv = document.getElementById(divtohide);
    if ( (vardiv !=="undefined") && (vardiv !== null) )
      vardiv.style.display = "none";

}


function showDiv(divtoshow){

  let vardiv = document.getElementById(divtoshow);
    if ( (vardiv !=="undefined") && (vardiv !== null) )
      vardiv.style.display = "block";

}

function cleanInsideDiv(divtoclean){

  let vardiv = document.getElementById(divtoclean);
    if ( (vardiv !=="undefined") && (vardiv !== null) )
      vardiv.innerHTML = "";

}

function callInfoPopup(infotype,messagetoshow){
    //let modaldiv = document.getElementById(divtoclean);
    //let infoIconDiv = document.getElementById(divtoclean);
    //let infoMessageDiv =document.getElementById(infoMessage);
    $('#modalWindow').modal();

}