export default function (state=[], action) {
  if(action.type == 'watching') {
    //console.log(action);
    var newShow = {
      name: action.name,
      poster: action.poster,
      seasons: action.seasons,
      episodes: action.episodes,
      status: action.status
    }

    var watchingCopy = [...state];
    watchingCopy.push(newShow);
    // console.log("reducer", watchingCopy[0]);
    // var watchingCopy = [ newShow ];

    return watchingCopy;
  } else if (action.type == 'switchStatusShow'){

    var watchingCopy = [...state];
    for(var i=0; i<watchingCopy.length; i++) {
      if(watchingCopy[i].name == action.name){
        watchingCopy[i].status = action.status
      }
    }
     return watchingCopy;
  } else if (action.type == 'deleteShow'){

    var watchingCopy = [...state];
    for(var i=0; i<watchingCopy.length; i++) {
      if(watchingCopy[i].name == action.name){
        watchingCopy.splice(i, 1);
      }

    }

     return watchingCopy;
  }
  else {
    return state;
  }
}
