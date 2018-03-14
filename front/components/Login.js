import React from 'react';
import { View } from 'react-native';
import {Overlay, Divider, Input } from 'react-native-elements';

import {connect} from 'react-redux';

import Signinform from '../components/Signinform';
import Signupform from '../components/Signupform';

class Login extends React.Component {

constructor(){
  super();
  this.submitSignup = this.submitSignup.bind(this);
  this.submitSignin = this.submitSignin.bind(this);
}

// submitSignup(values){
//  console.log(values)
//  console.log(this.props.visible)
// }
//
// submitSignin(values){
// console.log(values)
// console.log(this.props.visible)
// }

//Fetch Post du Signupform
submitSignup(values){
  console.log('1 je suis dans le fetch du signup')
  const ctx = this;
  fetch('http://172.168.15.45:3000/signup', {
    method: 'post',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    })
  })
  .then(res => {
    this.props.submitSignup() // permet de se diriger vers le mapDispatchToProps
    console.log('2 je suis dans le fetch du signup')
    console.log(values.email, "-- le profil correspondant à ce mail a été créé")
  })
  .catch(error => console.log(error));
}

//Fetch Get du SignInForm
submitSignin(values){
  const ctx = this;
  fetch('http://172.168.15.45:3000/signin?email=' + values.email + '&password=' + values.password, {
    method: 'get',
    headers: {"Content-Type": "application/json"},
  })
  .then(response => response.json())
  .then(response => {
    this.props.submitSignin() // permet de se diriger vers le mapDispatchToProps
    console.log("la réponse est ", response);
  })
}

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Signinform onSubmit={this.submitSignin} />
        <Signupform onSubmit={this.submitSignup} />
        {/* permet de se diriger vers le Fetch post du Signupform */}
      </View>
  );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitSignin: function() {
        dispatch( {type: 'signin'} );
    },
    submitSignup: function() {
        dispatch( {type: 'signup'} );
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(Login);
