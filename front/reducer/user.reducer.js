export default function user(state="", action) {
  if(action.type == 'signin' || action.type == 'signup') {
    return action.user;    
  } else {
    return state;
  }
}
