module.exports = function (app,dbRequest,dbconn) {

app.get('/',(req, res) =>{
	//res.render('index',{appname: 'myapp', message:'my message'});
	console.log("main view called");
	res.render('./mainpage/main');
	//res.end();
	//res.status(404).send('message');

});
app.get('/index',(req, res) =>{
	//res.render('index',{appname: 'myapp', message:'my message'});
	console.log("main view called");
	res.render('./mainpage/index');
	//res.end();
	//res.status(404).send('message');

});
}