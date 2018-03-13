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

submitSignup(values){
 console.log(values)
}

submitSignin(values){
console.log(values)
}

//Fetch Post du Signupform
submitSignup(values){
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
    console.log(values.email, "-- le profil correspondant à ce mail a été créé")
  })
  .catch(error => console.log(error));
}

//Fetch Get du SignInForm
submitSignin(values){
  const ctx = this;
  fetch('http://172.168.15.45:3000/signin', {
    method: 'get',
    headers: {"Content-Type": "application/json"}
  })
  .then(response => response.json())
  .then(response => {
    console.log("la réponse est ", response);
  })
}

  render() {
    return (
    <Overlay isVisible={true} height="auto" overlayStyle={{justifyContent: 'center', alignItems: 'center', marginBottom: 100}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Signinform onSubmit={this.submitSignin} />
        <Signupform onSubmit={this.submitSignup} />
      </View>
    </Overlay>);
  }
}

export default connect(
    null
)(Login);
