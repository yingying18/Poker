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
          console.log("error : " + JSON.stringify(result));
          callback(err);
          throw err;
        } else {
          console.log("returning response from db insertUser :  " + JSON.stringify(result));
          callback(result);
        }
        //con.release();
      }
    );
  },
  getUsers: function (con, data, callback) {
    let result = con.query("Select * from user ;", 
      function ( err, result,  fields ) {
      if (err) throw err;
      console.log("returning response from db getUsers :  " + JSON.stringify(result));
      callback(result);
      //con.release();
    });
  },
  getUserEmailandUserNameCount: function (con, data, callback) {
    let result = con.query( "select count(*) as count from user where (username = '" +  data.registername +  "' or email='" +  data.registeremail + "' ); ",
      function (err, result, fields) {
        if (err) throw err;
        console.log("returning response from db getUserEmailandUserNameCount :  " + JSON.stringify(result));
        callback(result);
        //con.release();
      }
    );
  },
  getUserByEmail: function (con, data, callback) {
    let result = con.query( "select * from user where (email='" + data.registeremail +  "' ); ",
      function (err, result, fields) {
        if (err) throw err;
        console.log("returning response from db getUserByEmail :  " + JSON.stringify(result));
        callback(result);
        //con.release();
      }
    );
  },
  checkLoginUser: function (con, data, callback) {
    let result = con.query( "select * from user where (username = '" +  data.username +  "' and password ='" +   data.password +  "' ); ",
      function (err, result, fields) {
        if (err) throw err;
        console.log("returning response from db checkLoginUser :  " + JSON.stringify(result));
        callback(result);
        //con.release();
      }
    );
  },
  updateUser: function (con, data, callback) {
    let result = con.query( "update user set username = '" + data.name + "' where id = " + data.id, 
      function (err, result, fields) {  
        if (err) throw err;
        console.log("returning response from db updateUser : " + JSON.stringify(result));
        callback(result);
        //con.release();
      }
    );
  },
  getAllTables: function (con, data, callback) {
    let result = con.query( "select * from tables ;" , 
      function (err, result, fields) {
        if (err) throw err;
        console.log("returning response from db getAllTables : " + JSON.stringify(result));
        callback(result);
        
      }
    );
  },
  getTableById: function (con, data, callback) {
      console.log(data);
    let result = con.query(  "select * from tables where table_id = " +  data.tableid ,
      function (err, result, fields) {
        if (err) throw err;
        console.log("returning response from db getTableById : " + JSON.stringify(result));
        callback(result);
        
      }
    );
  },
  getGameTableSession: function (con, data, callback) {
      console.log(data);
    let result = con.query(  "select * from gametablesession where table_id = " +  data.tableid + " and state != 'ended' " ,
      function (err, result, fields) {
        if (err) throw err;
        console.log("returning response from db getGameTableSession : " + JSON.stringify(result));
        callback(result);
        
      }
    );
  },
  createGameTableSession: function (con, data, callback) {
     console.log("createGameTableSession"+ JSON.stringify(data));
    let result = con.query(  
      "insert into gametablesession "+
      "("+
      "table_id,"+
      "state,"+
      "userturn,"+
      "usercyclestarter,"+
      "totalbet,"+
      "cycle,"+
      "maxcycle"+
      ")"+
      " values ( "+
      data.tableid+ ","+
      '"waiting"'+","+
      data.userid+ ","+
      data.userid+ ","+
      "0,"+
      "1,"+
      "1"+
      ")",
      function (err, result, fields) {
        if (err) throw err;
        console.log("returning response from db createGameTableSession : " + JSON.stringify(result));
        callback(result);
        
      }
    );
  },
  createGameUserSession: function (con, data, callback) {
    console.log("createGameUserSession in db"+ JSON.stringify(data));
    let result = con.query(  
      "insert into gameusersession "+
      "("+
      "gamesession_id,"+
      "user_id,"+
      "seatnumber,"+
      "userbet"+
      ")"+
      " values ( "+
      data.gametablesession.id+ ","+
      data.userid+ ","+
      data.seatno+ ","+
      "0"+
      ")",
      function (err, result, fields) {
        if (err) throw err;
        console.log("returning response from db createGameUserSession : " + JSON.stringify(result));
        callback(result);
        
      }
    );
  }
};
