module.exports = {
 
            insertUser: function(con, data, callback) {
              // whatever


                  con.connect(function(err) {
                    if (err) throw err;
                    console.log("Connected!");
                  });

                  //console.log(myvara);
                  callback('connected');

            },
            getUsers: function(con,data ,callback) {
               
                let result = con.query("Select * from user ;", function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result[0].id);
                    callback(result);
                    //con.release();

                  });
            },

            updateUser: function(con,data ,callback) {
                    let result = con.query("update user set username = '"+data.name+"' where id = "+data.id, function (err, result , fields) {
                   
                    if (err) throw err;
                    console.log("in sendQuery Result: " + result);
                    callback(result);
                    //con.release();

                    });
            }
           

};