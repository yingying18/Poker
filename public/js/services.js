//method : post,get,put,delete
//urlaction: link to catch request

let socket = io.connect('http://localhost:3000');
var gameSessionData = {
  thisuser : 0,
  thissocketid : "",
  thiscards : [],
  thisseatno : 0 ,
  thisbet : 0,
  seatstaken : [],
  users : [],
  deck : [],
  gamesessionid : 0,
  housecards : [],
  usercards : [],
  socketroom : 0,
  socketids : [] ,
  gamestatus : "",
  userstatus : "",
  gamecycle : 0,
  userturn: 0,
  tableid : 0,
  usersinsocketroom : [],
  tablemoney : 0

};


let usera = null;
let timercheck = null;

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
            
            if (callback.name === 'reseizeOpaqueDiv') {
              
             callback(urlaction,destinationdiv);
            }else{
              
              callback();

            }
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
    document.getElementById("middleContainerOpaq").style.height = document.getElementById('updatableMiddleContainer').clientHeight +100+ "px";
    document.getElementById("updatableMiddleContainer").style.paddingLeft = calcwidth-50 + "px";
 


  
   
   
}