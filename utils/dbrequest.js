module.exports = {
  insertUser: function(con, data, callback) {
    // whatever

    console.log("sql catching the form:" + JSON.stringify(data));
    var returnValue;
    //date format 'YYYY-MM-DD'
    this.resulta = con.query(
      "insert into user (" +
        "username," +
        "password," +
        "email," +
        "picture," +
        "registerdate" +
        ") values ('" +
        data.name +
        "','" +
        data.password +
        "','" +
        data.email +
        "',0," +
        "DATE(NOW())" +
        ")",
      function(err, result, fields) {
        if (err) {
          console.log("error : " + result);
          callback(err);
          throw err;
        } else {
          console.log("in sendQuery Result: " + result);
          callback(result);
        }
        //con.release();
      }
    );
  },
  getUsers: function(con, data, callback) {
    let result = con.query("Select * from user ;", function(
      err,
      result,
      fields
    ) {
      if (err) throw err;
      console.log("in sendQuery Result: " + result[0].id);
      callback(result);
      //con.release();
    });
  },

  updateUser: function(con, data, callback) {
    let result = con.query(
      "update user set username = '" + data.name + "' where id = " + data.id,
      function(err, result, fields) {
        if (err) throw err;
        console.log("in sendQuery Result: " + result);
        callback(result);
        //con.release();
      }
    );
  }
};
