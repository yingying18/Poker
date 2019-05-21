let activeEditNo = -1;
function makeAdminUserEditable(id, name, password, email, usertype) {
  activeEditNo = id;
  document.getElementById("user" + id).innerHTML =
    '<form id="editUser" method="post">' +
    '<td style="width:15%">' + id + '</td>' +
    '<td style="width:15%"><input type="text" id="userName" name="userName" value="' + name +'"></td>' +
    '<td style="width:15%"><input type="text" id="userPass" name="userPass" value="' + password + '"></td>' +
    '<td style="width:15%"><input type="text" id="userEmail" name="userEmail" value="' + email + '"></td>' +
    '<td style="width:15%"><input type="text" id="userType" name="userType" value="' + usertype + '"></td>' +
    '</form>' +
    '<td style="width:15%"><button style="color:white;background-color:#455DF7 type="button" onclick="">Button</button></td>';
}

function cancelUserEditable(id, name, password, usertype) {
  method = "post";
  urlaction = "gotomenu/adminpanel";
  destinationdiv = "updatableMiddleContainer";
  data = "";

  gotoMenu(method, urlaction, data, destinationdiv);
}


function createNewTable(){
  var maxplayer = document.getElementById("maxplayerinput").value;
  var minbetamount = document.getElementById("minbetamountinput").value;
  method = "post";
  urlaction = "adminpanel/addnewtable";
  destinationdiv = "updatableMiddleContainer";
  var data = {};
  data.maxplayer = maxplayer;
  data.minamount = minbetamount;

  postData(method, urlaction, data, destinationdiv);
}

function giveAdmin(id, username, usertype, email){
  method = "post";
  urlaction = "adminpanel/giveadmin";
  destinationdiv = "updatableMiddleContainer";
  var data = {};
  data.id = id;
  document.getElementById("admin"+id).innerHTML = "" +
  "<td>" + id +"</td>" +
  "<td>" + username + "</td>" +
  "<td>" + 1 + "</td>" +
  "<td>" + email + "</td>";

  postData(method, urlaction, data, destinationdiv);
}

function removeAdmin(id, username, usertype, email){
  method = "post";
  urlaction = "adminpanel/removeadmin";
  destinationdiv = "updatableMiddleContainer";
  var data = {};
  data.id = id;
  document.getElementById("admin"+id).innerHTML = "" +
  "<td>" + id +"</td>" +
  "<td>" + username + "</td>" +
  "<td>" + 0 + "</td>" +
  "<td>" + email + "</td>";

  postData(method, urlaction, data, destinationdiv);
}

function suspendUser(id) {
  method = "post";
  urlaction = "adminpanel/suspenduser";
  destinationdiv = "updatableMiddleContainer";
  document.getElementById("user"+id).innerHTML = "";

  var data = {};
  data.id = id;

  postData(method, urlaction, data, destinationdiv);
}

function removeUser(id) {
  method = "post";
  urlaction = "adminpanel/removeuser";
  destinationdiv = "updatableMiddleContainer";
  document.getElementById("user"+id).innerHTML = "";

  var data = {};
  data.id = id;

  postData(method, urlaction, data, destinationdiv);
}

function removetable(id){
  method = "post";
  urlaction = "adminpanel/removetable";
  destinationdiv = "updatableMiddleContainer";

  var data = {};
  data.id = id;

  

  postData(method, urlaction, data, destinationdiv);
}

function logincheck() {
  let username = document.getElementById('loginusername').value;
  let password = document.getElementById('loginpassword').value;

  var data = {};
  data.username = username;
  data.password = password;

  postData('post', 'login/authanticate', data, 'updatableMiddleContainer');
}

function userregister() {
  let user = document.getElementById("registername").value;
  let email = document.getElementById("registeremail").value;
  let pass = document.getElementById("registerpassword").value;
  let repass = document.getElementById("registerrepassword").value;
  let agree = document.getElementById("registeragree").checked;
  let userimage = null;
  let formdata = {
    registername: "user name",
    registeremail: "user email",
    registerpassword: "password",
    registeragree: "user agreement"
  };

  var formaData = new FormData();

  var x = document.getElementById("registeruserimage");
  userimage = x.files[0];
  formaData.append("registeruserimage", userimage);

  let postdata = {
    registername: user,
    registeremail: email,
    registerpassword: pass
  };

  formaData.append("postdata", JSON.stringify(postdata));
  console.log("file info : " + formaData["image"]);
  let infotext = "";

  if (user === "") {
    infotext = infotext + " user field is empty <br>";
  }

  if (email === "") {
    infotext = infotext + " email field is empty <br>";
  }
  
  if (pass === "") {
    infotext = infotext + " password field is empty <br>";
  }

  if (repass === "") {
    infotext = infotext + " re password field is empty <br>";
  }

  if (agree === false) {
    infotext = infotext + " you need to agree the terms and conditions <br>";
  }

  if (pass !== repass) {
    infotext = infotext + " pasword and repassword fields are not matching <br>";
  }

  if (infotext === "") {
    postMultipartData("post", "registersave", formaData, "cube");
  } else {
    callInfoPopup("registration form", "report_problem", infotext);
  }
}














