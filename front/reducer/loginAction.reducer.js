export default function loginAction(state={login:true}, action) {
  if(action.type == 'signup' || action.type == 'signin') {
    var userCopy = Object.assign({}, state);
    userCopy.login = false;
    console.log('on est dans le reducer', userCopy)
    return userCopy;
  } else {
    return state;
  }
}
