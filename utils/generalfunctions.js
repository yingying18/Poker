


var utils  = {

      countJson:function(obj) {
      var count=0;
        for(var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
             ++count;
          }
        }
      return count;
    }

};

module.exports = utils;