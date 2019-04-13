module.exports = {
  insertUser: function (con, data, callback) {
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
      "registerdate," +
      "filetype" +
      ") values ('" +
      data.registername +
      "','" +
      data.registerpassword +
      "','" +
      data.registeremail +
      "'," + data.picture + "," +
      "DATE(NOW())," +
      "'" + data.filetype + "'" +
      ")",
      function (err, result, fields) {
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
  getUsers: function (con, data, callback) {
    let result = con.query("Select * from user ;", function (
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
  getUserEmailandUserNameCount: function (con, data, callback) {
    let result = con.query(
      "select count(*) as count from user where (username = '" +
      data.registername +
      "' or email='" +
      data.registeremail +
      "' ); ",
      function (err, result, fields) {
        if (err) throw err;
        console.log("in sendQuery Result: " + result[0]);
        callback(result);
        //con.release();
      }
    );
  },
  getUserByEmail: function (con, data, callback) {
    let result = con.query(
      "select * from user where (email='" +
      data.registeremail +
      "' ); ",
      function (err, result, fields) {
        if (err) throw err;
        console.log("in sendQuery Result: " + result[0]);
        callback(result);
        //con.release();
      }
    );
  },
  updateUser: function (con, data, callback) {
    let result = con.query(
      "update user set username = '" + data.name + "' where id = " + data.id,
      function (err, result, fields) {
        if (err) throw err;
        console.log("in sendQuery Result: " + result);
        callback(result);
        //con.release();
      }
    );
  }
};
