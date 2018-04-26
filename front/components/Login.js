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

  //Fetch Post du Signupform
  submitSignup(values){
    console.log('1 je suis dans le fetch du signup')
    const ctx = this;
    fetch('http://10.2.1.60:3000/signup', {
      method: 'post',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'email='+values.email+'&firstName='+values.firstName+'&lastName='+values.lastName+'&password='+values.password
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      // permet de se diriger vers le mapDispatchToProps
      ctx.props.onSubmitSignup(values.firstName, values.lastName, values.email, values.password);
      console.log('2 je balance le signup dans le dispatch')
      console.log(values.email, "-- le profil correspondant à ce mail a été créé")
    })
    .catch(error => console.log(error));
  }

  //Fetch Get du SignInForm
  submitSignin(values){
    console.log('1 je suis dans le fetch du signin')
    const ctx = this;
    fetch('http://10.2.1.60:3000/signin?email=' + values.email + '&password=' + values.password)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // permet de se diriger vers le mapDispatchToProps
      ctx.props.onSubmitSignin(values.email, values.password, data.firstName, data.lastName, data._id);
      console.log('2 je balance le signin dans le dispatch', data);
    })
    .catch(error => console.log(error));
  }

  render() {

    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Signinform onSubmit={this.submitSignin} />
        {/* permet de se diriger vers le Fetch get du SignInForm */}
        <Signupform onSubmit={this.submitSignup} />
        {/* permet de se diriger vers le Fetch post du SignUpform */}
      </View>
  );
  }
}

function mapDispatchToProps(dispatch) {
  console.log("hey");
  return {
    onSubmitSignin: function(email, password, firstName, lastName, _id) {
      console.log("mapDispatchToProps onSubmitSignin");
      dispatch( {type: 'signin', email, password, firstName, lastName} )
      dispatch( {type: 'user', _id} );
    },
    onSubmitSignup: function(email, password, firstName, lastName) {
      console.log("mapDispatchToProps onSubmitSignup");
      dispatch( {type: 'signup', email, password, firstName, lastName} )
      dispatch( {type: 'user', userId: _id} );
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
