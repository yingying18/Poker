module.exports = function (app,dbRequest,dbconn) {

app.get('/main',(req, res) =>{
	//res.render('index',{appname: 'myapp', message:'my message'});
	 console.log("main view called");
	res.render('./main');
	//res.end();
	//res.status(404).send('message');

});


app.post('/gotomenu/users',(req, res) =>{
	 console.log("gotomenu route called");

	 dbRequest.getUsers(dbconn,'',function(result){

				let list = result;
				
		 			res.render('./admin/users', {result:list});
		 		
	                         
	});
	
	
	

});



}