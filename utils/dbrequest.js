var colors = require('colors');
var utilities =  require("./generalfunctions.js");
module.exports = {

  insertUser: function (con, data, callback) {
    // whatever

    console.log(colors.yellow("data paremeter passed to db call insertUser : "+JSON.stringify(data)+'\n'));
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
          console.log(colors.yellow("returning response from db insertUser :  " + JSON.stringify(result)+'\n'));
          callback(result);
        }
        //con.release();
      }
    );
  },
  getUsers: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call getUsers : "+JSON.stringify(data)+'\n'));
    let result = con.query("Select * from user ;", 
      function ( err, result,  fields ) {
      if (err) {
          console.log(colors.magenta("db error : getUsers ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
      }
      console.log(colors.yellow("returning response from db getUsers :  " + JSON.stringify(result)+'\n'));
      callback(result);
      //con.release();
    });
  },
  getUserEmailandUserNameCount: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call getUserEmailandUserNameCount : "+JSON.stringify(data)+'\n'));
    let result = con.query( "select count(*) as count from user where (username = '" +  data.registername +  "' or email='" +  data.registeremail + "' ); ",
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getUserEmailandUserNameCount :  " + JSON.stringify(result)+'\n'));
        callback(result);
        //con.release();
      }
    );
  },
  getUserByEmail: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call getUserByEmail : "+JSON.stringify(data)+'\n'));
    let result = con.query( "select * from user where (email='" + data.registeremail +  "' ); ",
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getUserByEmail :  " + JSON.stringify(result)+'\n'));
        callback(result);
        //con.release();
      }
    );
  },
  checkLoginUser: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call checkLoginUser : "+JSON.stringify(data)+'\n'));
    let result = con.query( "select * from user where (username = '" +  data.username +  "' and password ='" +   data.password +  "' ); ",
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db checkLoginUser :  " + JSON.stringify(result)+'\n'));
        callback(result);
        //con.release();
      }
    );
  },
  updateUser: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call updateUser : "+JSON.stringify(data)+'\n'));
    let result = con.query( "update user set username = '" + data.name + "' where id = " + data.id, 
      function (err, result, fields) {  
        if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateUser : " + JSON.stringify(result)+'\n'));
        callback(result);
        //con.release();
      }
    );
  },
  getAllTables: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call getAllTables : "+JSON.stringify(data)+'\n'));
    let result = con.query( "select * from tables ;" , 
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getAllTables : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  getTableById: function (con, data, callback) {

      console.log(colors.yellow("data paremeter passed to db call getTableById : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select * from tables where table_id = " +  data.tableid ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getTableById : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  getGameTableSession: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call getGameTableSession : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select * from gametablesession where table_id = " +  data.tableid + " and state != 'ended' " ,
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getGameTableSession : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  getGameUserSessionForTable: function (con, data, callback) {
    if (data.hasOwnProperty('gamesessionid')){
      sessionid = data.gamesessionid;
    }else{
     sessionid = data.gametablesession.id;
    }
      console.log(colors.yellow("data paremeter passed to db call getGameUserSessionForTable : "+JSON.stringify(data)+'\n'));
    
    let result = con.query(  "select * from gameusersession gs inner join user us where gs.user_id = us.id and  gamesession_id = " +  sessionid  ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getGameUserSessionForTable : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  createGameTableSession: function (con, data, callback) {
      console.log(colors.yellow("data paremeter passed to db call createGameTableSession : "+JSON.stringify(data)+'\n'));
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
        if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db createGameTableSession : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  createGameUserSession: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call createGameUserSession : "+JSON.stringify(data)+'\n'));
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
        if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db createGameUserSession : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  deleteUserFromGameUserSession: function (con, data, callback) {
      console.log(colors.yellow("data paremeter passed to db call deleteUserFromGameUserSession : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "delete from gameusersession where  gamesession_id = " +  data.gamesessionid + " and user_id = " + data.userid ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : deleteUserFromGameUserSession ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db deleteUserFromGameUserSession : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  get52Cards: function (con, data, callback) {
      console.log(colors.yellow("data paremeter passed to db call get52Cards : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select * from card ",
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : get52Cards ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db get52Cards : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  getDeckLeftCards: function (con, data, callback) {
      console.log(colors.yellow("data paremeter passed to db call getGameUserSessionForTable : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select * from gameusersession gs inner join user us where gs.user_id = us.id and  gamesession_id = " +  data.gamesessionid  ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : getUserEmailandUserNameCount ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getGameUserSessionForTable : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  updateAlUsersCards: function (con, data, callback) {
      //console.log("oooooooooooooooooooooo"+(data.usercards[0] ));
      let countuserwithcards = utilities.countJson(data.usercards );
      let tempquery = "";
      let partialquery = "";
      let cnt = 1;
        for(var key in data.usercards) {
          if ( (cnt<countuserwithcards) && (cnt ===1) ){
            partialquery = " SELECT "+key+" as user_id, '"+data.usercards[key]+"' as new_cards ";
            partialquery = partialquery + "    UNION ALL ";
          }else if (cnt !== countuserwithcards){
            partialquery = partialquery +  "    SELECT "+key+", '" +data.usercards[key]+"' "; 
            partialquery = partialquery + "    UNION ALL ";

          }else{
            partialquery = partialquery +  "    SELECT "+key+",'" +data.usercards[key]+"'"; 
          }
          console.log("oooooooooooooooooooooo"+(key));
          cnt++;
        }
        console.log("oooooooooooooooooooooo"+(partialquery));
      console.log(colors.yellow("data paremeter passed to db call insertAlUsersCards : "+JSON.stringify(data)+'\n'));

      if (countuserwithcards>1){
        tempquery = " UPDATE gameusersession gus JOIN ( " +partialquery+
        " ) vals ON gus.user_id = vals.user_id "+
        " SET usercards = new_cards ";
      }
    let result = con.query(  tempquery ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : insertAlUsersCards ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db insertAlUsersCards : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  updateUserTurn: function (con, data, callback) {
      console.log(colors.yellow("data paremeter passed to db call updateUserTurn : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update gametablesession set userturn = "+data.userturn+" where id = " +  data.gamesessionid  ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : updateUserTurn ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateUserTurn : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  }
};
