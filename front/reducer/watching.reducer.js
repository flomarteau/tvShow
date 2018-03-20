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
    console.log(watchingCopy);
    //console.log(watchingCopy[0].title);
    // var watchingCopy = [ newShow ];

    return watchingCopy;
  } else {
    return state;
  }
}
