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
    getUniqueUser: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call getUniqueUser : "+JSON.stringify(data)+'\n'));
    let result = con.query("Select * from user where id = " + data.userid , 
      function ( err, result,  fields ) {
      if (err) {
          console.log(colors.magenta("db error : getUniqueUser ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
      }
      console.log(colors.yellow("returning response from db getUniqueUser :  " + JSON.stringify(result)+'\n'));
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
          console.log(colors.magenta("db error : getUserByEmail ->" + JSON.stringify(result)+ '\n'));
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
          console.log(colors.magenta("db error : checkLoginUser ->" + JSON.stringify(result)+ '\n'));
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
          console.log(colors.magenta("db error : updateUser ->" + JSON.stringify(result)+ '\n'));
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
          console.log(colors.magenta("db error : getAllTables ->" + JSON.stringify(result)+ '\n'));
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
          console.log(colors.magenta("db error : getTableById ->" + JSON.stringify(result)+ '\n'));
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
          console.log(colors.magenta("db error : getGameTableSession ->" + JSON.stringify(result)+ '\n'));
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
          console.log(colors.magenta("db error : getGameUserSessionForTable ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getGameUserSessionForTable : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
    getGameUserUniqueSessionForTable: function (con, data, callback) {

      console.log(colors.yellow("data paremeter passed to db call getGameUserUniqueSessionForTable : "+JSON.stringify(data)+'\n'));
    
    let result = con.query(  "select * from gameusersession gus inner join gametablesession gts where gus.gamesession_id = gts.id and  gus.user_id = " +  data.userid + " and gts.state != 'ended' " ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : getGameUserUniqueSessionForTable ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getGameUserUniqueSessionForTable : " + JSON.stringify(result)+'\n'));
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
      "5"+
      ")",
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : createGameTableSession ->" + JSON.stringify(result)+ '\n'));
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
          console.log(colors.magenta("db error : createGameUserSession ->" + JSON.stringify(result)+ '\n'));
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
    //not used change if needed
      console.log(colors.yellow("data paremeter passed to db call getDeckLeftCards : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select * from gameusersession gs inner join user us where gs.user_id = us.id and  gamesession_id = " +  data.gamesessionid  ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : getDeckLeftCards ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getDeckLeftCards : " + JSON.stringify(result)+'\n'));
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
      console.log(colors.yellow("data paremeter passed to db call updateAlUsersCards : "+JSON.stringify(data)+'\n'));

      if (countuserwithcards>1){
        tempquery = " UPDATE gameusersession gus JOIN ( " +partialquery+
        " ) vals ON gus.user_id = vals.user_id "+
        " SET usercards = new_cards where gamesession_id = "+data.gamesessionid ;
      }else{
        let user = null;
        let cards = null;
        for(var key in data.usercards) {
          user = key;
          cards = data.usercards[key];
        }
        tempquery = "update gameusersession set usercards = '"+cards+"' where user_id = " + user + " and gamesession_id = "+ data.gamesessionid;
      }
    let result = con.query(  tempquery ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : updateAlUsersCards ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateAlUsersCards : " + JSON.stringify(result)+'\n'));
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
  },
  updateTableSessionTimer: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call updateTableSessionTimer : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update gametablesession set timer = "+data.thistimer+" where table_id = " +  data.tableid  ,
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : updateTableSessionTimer ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateTableSessionTimer : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  getTableSessionTimer: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call getTableSessionTimer : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select * from gametablesession where table_id = " +  data.tableid  ,
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : getTableSessionTimer ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getTableSessionTimer : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  updateUserSessionPlayed: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call updateUserSessionPlayed : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update gameusersession set played = "+ data.played +" where user_id = " +  data.thisuser  ,
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : updateUserSessionPlayed ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateUserSessionPlayed : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  getUserSessionPlayed: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call updateUserSessionPlayed : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select * from gameusersession where user_id = " +  data.thisuser  ,
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : updateUserSessionPlayed ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateUserSessionPlayed : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  updateGameStartInTimer: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call updateGameStartInTimer : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update gametablesession set gamestartin = "+ data.gamestartinsec +" where id = " +  data.gamesessionid   ,
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : updateGameStartInTimer ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateGameStartInTimer : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  updateHouseCards: function (con, data, callback) {
      console.log(colors.yellow("data paremeter passed to db call updateHouseCards : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update gametablesession set housecards = '"+data.housecards+"' where id = "+data.gamesessionid ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : updateHouseCards ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateHouseCards : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  setNullAllCards: function (con, data, callback) {
    //not used change if needed
      console.log(colors.yellow("data paremeter passed to db call setNullAllCards : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update  gameusersession set usercards = NULL where gamesession_id = " +  data.gamesessionid ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : setNullAllCards ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db setNullAllCards : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  setNullHouseCards: function (con, data, callback) {
    //not used change if needed
      console.log(colors.yellow("data paremeter passed to db call setNullHouseCards : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update  gametablesession set housecards = NULL where id = " +  data.gamesessionid ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : setNullHouseCards ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db setNullHouseCards : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  updatePlayeduser: function (con, data, callback) {

    
      console.log(colors.yellow("data paremeter passed to db call updatePlayeduser : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update gameusersession set played  = 1 where user_id = "+data.userturn ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : updatePlayeduser ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updatePlayeduser : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  clearAllPlayedUser: function (con, data, callback) {
    console.log(data.users);
    let users = (data.users).toString();
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%% users : "+users); 
    
      console.log(colors.yellow("data paremeter passed to db call clearAllPlayedUser : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update gameusersession set played  = 0 where user_id in  ( "+users+ " ) " ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : clearAllPlayedUser ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db clearAllPlayedUser : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  updateTableState: function (con, data, callback) {
      console.log(colors.yellow("data paremeter passed to db call updateTableState : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update gametablesession set state = '"+data.gamestatus+"' where id = " +  data.gamesessionid  ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : updateTableState ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateTableState : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  getTableState: function (con, data, callback) {
      console.log(colors.yellow("data paremeter passed to db call updateTableState : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select state from gametablesession where id = " +  data.gamesessionid  ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : updateTableState ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateTableState : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  updateCycle: function (con, data, callback) {
      console.log(colors.yellow("data paremeter passed to db call updateCycle : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "update gametablesession set cycle = "+data.cycle+" where id = " +  data.gamesessionid  ,
      function (err, result, fields) {
        if (err) {
          console.log(colors.magenta("db error : updateCycle ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db updateCycle : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
  getAllUserForGameSession: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call getGameSessionForUser : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select * from gameusersession where gamesession_id = " +  data.gamesessionid + " and user_id != " + data.thisuser ,
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : getGameSessionForUser ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getGameSessionForUser : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
    getAllUserForGameSessionIncludeSender: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call getAllUserForGameSessionIncludeSender : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "select * from gameusersession where gamesession_id = " +  data.gamesessionid  ,
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : getAllUserForGameSessionIncludeSender ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db getAllUserForGameSessionIncludeSender : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  },
    deleteGameSession: function (con, data, callback) {
    console.log(colors.yellow("data paremeter passed to db call deleteGameSession : "+JSON.stringify(data)+'\n'));
    let result = con.query(  "delete from gametablesession where id = " +  data.gamesessionid  ,
      function (err, result, fields) {
       if (err) {
          console.log(colors.magenta("db error : deleteGameSession ->" + JSON.stringify(result)+ '\n'));
          callback(err);
          throw err;
        }
        console.log(colors.yellow("returning response from db deleteGameSession : " + JSON.stringify(result)+'\n'));
        callback(result);
        
      }
    );
  }
};
