

function showgame(tableid) {
 

  var data = {};

  data.tableid = tableid;
  


  postData('post', 'lobby/showgame', data, 'updatableMiddleContainer',reseizeOpaqueDiv);

}


