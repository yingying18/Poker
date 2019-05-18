function makeUserEditable(id, name, password, usertype) {
  activeEditNo = id;
  document.getElementById("user" + id).innerHTML =
    '<form id="editUser" method="post">' +
    "<td></td>" +
    '<td><input type="text" id="userName" name="userName" value="' +
    name +
    '"></td>' +
    '<td><input type="text" id="userPass" name="userPass" value="' +
    password +
    '"></td>' +
    '<td><input type="text" id="userType" name="userType" value="' +
    usertype +
    '"></td>' +
    '</form><td></td><td><button class="btn btn-secondary btn-sm" onclick="updateUser(' +
    id +
    ',userName.value,userPass.value,userType.value);" >submit</button>&nbsp;<button class="btn btn-secondary btn-sm"  onclick="cancelUserEditable(' +
    id +
    ",'" +
    name +
    "','" +
    password +
    "','" +
    usertype +
    "');\" >cancel</button></td>";
}

function cancelUserEditable(id, name, password, usertype) {
  method = "post";
  urlaction = "gotomenu/users";
  destinationdiv = "updatableMiddleContainer";
  data = "";

  gotoMenu(method, urlaction, data, destinationdiv);
}

function updateUser(id, name, password, usertype) {
  method = "post";
  urlaction = "adminpanel/saveuser";
  destinationdiv = "updatableMiddleContainer";

  var data = {};
  data.id = id;
  data.name = name;
  data.password = password;
  data.usertype = usertype;

  postData(method, urlaction, data, destinationdiv);
}

function changepassword(){
  let newPassword = document.getElementById('registerpassword').value;
  let rePassword = document.getElementById('registerrepassword').value;
  
  var data = {};
  if (newPassword == rePassword){
    data.password = newPassword;
  }

  postData('post', 'userprofile/changepassword', data, 'updatableMiddleContainer', 'reseizeOpaqueDiv');
}

function logincheck() {
  let username = document.getElementById('loginusername').value;
  let password = document.getElementById('loginpassword').value;

  var data = {};

  data.username = username;
  data.password = password;


  postData('post', 'login/authanticate', data, 'updatableMiddleContainer', 'reseizeOpaqueDiv');

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
  //formaData.append("postdata", JSON.stringify(postdata));
  //alert(formaData.length);
  console.log("file info : " + formaData["image"]);
  let infotext = "";
  //alert(agree);
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