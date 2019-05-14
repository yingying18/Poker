//method : post,get,put,delete
//urlaction: link to catch request

let usera = null;
let startgametimercheck = null;
let userturntimercheck = null;
let socket = io.connect('http://localhost:3000');


let gameSessionData = {
  thisuser : 0,
  thissocketid : "",
  thisseatno : 0 ,
  thisbet : 0,
  thistimer : 5,
  usersbet : {},
  seatstaken :{},
  socketids : {},
  usercards : {},
  playedusers : {},
  users : [],
  deck : [],
  housecards : [],
  gamesessionid : 0,
  socketroom : 0,
  gamestatus : "",
  userstatus : "",
  cycle : 0,
  maxcycle : 0,
  userturn: 0,
  tableid : 0,
  tablemoney : 0,
  played : 0,
  calls : 0,
  gamestartinsec:10


};

var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

function postData(method, urlaction, data, destinationdiv,callback) {
  console.log("data json post called");
  let control = false;
  let senddata = {};
  if (typeof data !== "undefined" && data !== "") {
    control == true;
    senddata = data;
  }

  $.ajax({
    type: method,
    url: urlaction,
    data: JSON.stringify(senddata),

    contentType: "application/json; charset=utf-8",
    success: function (data) {
      try {
        console.log(data);
        if (typeof data.error !== 'undefined'){
          callInfoPopup("can't join table", "report_problem", data.error);
          
          //alert(data.error);
          return false;
        }
      } catch (e) {
        
      }
      console.log("success: data sent ");
     if (typeof data !== "undefined" && data !== "") {
        document.getElementById(destinationdiv).innerHTML = data;
      }
      
     
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
 


   
    //console.log(urlaction);
    let calcwidth =parseInt( ((document.getElementById("updatableMiddleContainer").offsetWidth  ) - (document.getElementById("innercube").offsetWidth) )/2);
    document.getElementById("middleContainerOpaq").style.height = document.getElementById('updatableMiddleContainer').clientHeight +100+ "px";
    document.getElementById("updatableMiddleContainer").style.paddingLeft = calcwidth-50 + "px";
 


  
   
   
}

    function countJson(obj) {
      var count=0;
        for(var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
             ++count;
          }
        }
      return count;
    }