export default function (state=[], action) {
  if(action.type == 'watching') {
    //console.log(action);
    var newShow = {
      name: action.name,
      poster: action.poster,
      seasons: action.seasons,
      episodes: action.episodes,
    }

    var watchingCopy = [...state];
    watchingCopy.push(newShow);
    console.log("reducer", watchingCopy[0]);
    // console.log("newShow" + newShow);
    // var watchingCopy = [ newShow ];

    return watchingCopy;
  } else {
    return state;
  }
}
