let activeEditNo=-1;
function makeUserEditable(id, name,password,usertype){
   
   activeEditNo = id;
    document.getElementById("user"+id).innerHTML = "<form id=\"editUser\" method=\"post\">"+"<td></td>"+
    "<td><input type=\"text\" id=\"userName\" name=\"userName\" value=\""+name+"\"></td>"+
    "<td><input type=\"text\" id=\"userPass\" name=\"userPass\" value=\""+password+"\"></td>"+
    "<td><input type=\"text\" id=\"userType\" name=\"userType\" value=\""+usertype+"\"></td>"+
    "</form><td></td><td><button class=\"btn btn-secondary btn-sm\" onclick=\"updateUser("+id+",userName.value,userPass.value,userType.value);\" >submit</button>&nbsp;<button class=\"btn btn-secondary btn-sm\"  onclick=\"cancelUserEditable("+id+",'"+name+"','"+password+"','"+usertype+"');\" >cancel</button></td>";
}

function cancelUserEditable(id, name,password,usertype){
   	method = 'post';
	urlaction = 'gotomenu/users';
	destinationdiv = 'updatableMiddleContainer';
	data='';

	gotoMenu(method,urlaction,data, destinationdiv);
}

function updateUser(id, name,password,usertype){
	method = 'post';
	urlaction = 'admin/saveuser';
	destinationdiv = 'updatableMiddleContainer';

	var data = {};
	data.id = id;
	data.name = name;
	data.password = password;
	data.usertype = usertype;
	

	 postData(method,urlaction,data, destinationdiv);
   
}



function login(){

}

function register(){

}