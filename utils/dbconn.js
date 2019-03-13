var mysql = require('mysql');


var dbcon  = mysql.createConnection({

  host     : 'casualadd.com',
  user     : 'csc',
  port     : 3000,
  password : '1#2019',
  database : 'csc'

});

module.exports = dbcon;