export default function loginAction(state={login:false, firstName:null, lastName:null, email:null, password:null}, action) {
  if(action.type == 'signup' || action.type == 'signin') {
    var userCopy = Object.assign({}, state);
    console.log('on est dans le reducer loginAction', userCopy);
    userCopy.login = true;
    userCopy.firstName = action.firstName;
    userCopy.lastName = action.lastName;
    userCopy.email = action.email;
    userCopy.password = action.password;
    return userCopy;
  } else {
    return state;
  }
}
