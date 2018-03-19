import React from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { reduxForm, Field } from "redux-form";
import textAccount from './textAccount';

class Signupform extends React.Component {

  render(){
    return(
      <View>
        <Field
          name="firstName"
          component={textAccount}
          fieldName="First Name"
        />
        <Field
          name="lastName"
          component={textAccount}
          fieldName="Last Name"
        />
        <Field
          name="email"
          component={textAccount}
          fieldName="Email"
        />
        <Field
          name="password"
          component={textAccount}
          fieldName="password"
        />
        <Button
          onPress={this.props.handleSubmit}
          title="Sign Up"
          textStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#fa983a",
            width: 200,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
            marginBottom: 20,
          }}
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    )
  }
}

export default reduxForm({
  form: 'signup'
})(Signupform);
