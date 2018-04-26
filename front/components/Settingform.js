import React from 'react';
import { Text, View } from 'react-native';
import { Input, Button, Divider } from 'react-native-elements';
import { reduxForm, Field } from "redux-form";
import textSetting from './textSetting';

class Settingform extends React.Component {

  render() {
    return (
      <View>
            <Text h2 style={{fontSize: 30, color: '#fa983a', marginLeft: 65, marginBottom: 15, marginTop: 10}}>Profile To Update</Text>
            <Field
              name="email"
              component={textSetting}
              fieldName="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Divider style={{ height: 40, backgroundColor: 'white' }} />
            <Field
              name="firstName"
              component={textSetting}
              fieldName="First Name"
            />
            <Field
              name="lastName"
              component={textSetting}
              fieldName="Last Name"
            />
            <Field
              name="password"
              component={textSetting}
              fieldName="password"
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <Divider style={{ height: 20, backgroundColor: 'white' }} />
            <Button
              onPress={this.props.handleSubmit}
              title="Save My Settings"
              textStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "#fa983a",
                width: 200,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
                marginTop: 5,
                marginBottom: 15
              }}
            />
      </View>
    );
  }
}

export default reduxForm({
  form: 'settingform'
})(Settingform)
