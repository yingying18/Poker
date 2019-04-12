let activeEditNo = -1;
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
  urlaction = "admin/saveuser";
  destinationdiv = "updatableMiddleContainer";

  var data = {};
  data.id = id;
  data.name = name;
  data.password = password;
  data.usertype = usertype;

  postData(method, urlaction, data, destinationdiv);
}

function login() {}

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
  //alert(x.files.length);
  var txt = "";
  if ("files" in x) {
    if (x.files.length == 0) {
      txt = "Select one or more files.";
    } else {
      for (var i = 0; i < x.files.length; i++) {
        txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
        userimage = x.files[i];
        formaData.append("registeruserimage", userimage);
        // alert(userimage.name);
        if ("name" in userimage) {
          txt += "name: " + userimage.name + "<br>";
        }
        if ("size" in userimage) {
          txt += "size: " + userimage.size + " bytes <br>";
        }
      }
    }
  }
  //formaData.append("obj", userimage);

  let postdata = {
    name: user,
    email: email,
    password: pass
  };
  //formaData.append("postdata", JSON.stringify(postdata));
  //alert(formaData.length);
  console.log("file info : " + formaData["image"]);
  //alert(agree);

  postMultipartData("post", "registersave", formaData, "cube");
  //callInfoPopup("", "");
}
