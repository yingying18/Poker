//method : post,get,put,delete
//urlaction: link to catch request
function postData(method, urlaction, data, destinationdiv,callback) {
  console.log("data json post called");
 
  let senddata = {};
  if (typeof data !== "undefined" && data !== "") {
    senddata = data;
  }

  $.ajax({
    type: method,
    url: urlaction,
    data: JSON.stringify(senddata),

    contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log("success: data sent ");
      document.getElementById(destinationdiv).innerHTML = data;
     
      if ((urlaction == "login/authanticate") || (urlaction == "/logout")) {
        gotoMenu('get', '/navbar', '', 'header','');
        urlaction == "null";
      }

    }

  }).done(function(){
           if ((typeof callback !== "undefined") && ( callback !=="")){
             callback(urlaction,destinationdiv);
          }
      });
 

}

function postMultipartData(method, urlaction, data, destinationdiv) {
  console.log("data multipart post called");
  console.log(data);

  $.ajax({
    type: method,
    url: urlaction,
    data: data,
    processData: false,
    contentType: false,
    enctype: "multipart/form-data",
    //contentType: "application/json; charset=utf-8",
    success: function (data) {
      console.log("success: data sent ");

      document.getElementById(destinationdiv).innerHTML = data;
    }
  });
}

function gotoMenu(method, urlaction, data, destinationdiv, callback) {
  console.log("gotomenu called");

  postData(method, urlaction, data, destinationdiv,callback);


}

function hideDiv(divtohide) {
  let vardiv = document.getElementById(divtohide);
  if (vardiv !== "undefined" && vardiv !== null) vardiv.style.display = "none";
}

function showDiv(divtoshow) {
  let vardiv = document.getElementById(divtoshow);
  if (vardiv !== "undefined" && vardiv !== null) vardiv.style.display = "block";
}

function cleanInsideDiv(divtoclean) {
  let vardiv = document.getElementById(divtoclean);
  if (vardiv !== "undefined" && vardiv !== null) vardiv.innerHTML = "";
}

function callInfoPopup(title, infotype, messagetoshow) {
  // info type : report_problem

  document.getElementById('modalTitle').innerHTML = title;
  document.getElementById('modalMessage').innerHTML = messagetoshow;
  document.getElementById('modalLogo').innerHTML = infotype;

  //let modaldiv = document.getElementById(divtoclean);
  //let infoIconDiv = document.getElementById(divtoclean);
  //let infoMessageDiv =document.getElementById(infoMessage);
  $("#modalWindow").modal();
}

function reseizeOpaqueDiv(urlaction,divtochecksize){
 


   
        console.log(urlaction);
    let calcwidth =parseInt( ((document.getElementById("updatableMiddleContainer").offsetWidth  ) - (document.getElementById("innercube").offsetWidth) )/2);
    document.getElementById("middleContainerOpaq").style.height = document.getElementById('updatableMiddleContainer').clientHeight + "px";
    document.getElementById("updatableMiddleContainer").style.paddingLeft = calcwidth-50 + "px";
 


  
   
   
}