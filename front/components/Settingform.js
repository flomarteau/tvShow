import React from 'react';
import { Text, View } from 'react-native';
import { Input, Button, Divider } from 'react-native-elements';
import { reduxForm, Field } from "redux-form";
import textSetting from './textSetting';

class Settingform extends React.Component {

  render() {
    return (
      <View>
            <Field
              name="email"
              component={textSetting}
              fieldName="Email"
            />
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
            />
            <Divider style={{ height: 20, backgroundColor: 'white' }} />
            <Button
              onPress={this.props.handleSubmit}
              title="Save My Settings"
              textStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "#3498db",
                width: 200,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
                marginTop: 5
              }}
            />
      </View>
    );
  }
}

export default reduxForm({
  form: 'settingform'
})(Settingform)
