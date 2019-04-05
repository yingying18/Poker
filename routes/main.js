module.exports = function (app,dbRequest,dbconn) {

app.get('/',(req, res) =>{
	
	console.log("main view called");
	res.render('./mainpage/main');


});
app.get('/index',(req, res) =>{
	
	console.log("main view called");
	res.render('./mainpage/index');


});
}