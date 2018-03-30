export default function user(state={_id:null}, action) {
  if(action.type == 'signin' || action.type == 'signup') {
    var userIdCopy = Object.assign({}, state);
    console.log('on est dans le reducer user', userIdCopy);
    userIdCopy._id = action._id;
    return userIdCopy;
  } else {
    return state;
  }
}
