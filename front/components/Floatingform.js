import React from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { initialize, reduxForm, Field } from "redux-form";
import textSetting from './textSetting';


class Settingform extends React.Component {
  render() {
    return (
      <View>

          <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginLeft: 10, backgroundColor: '#ff9f43', color: 'white', padding: 8, fontSize: 20}}>First Name</Text>
            <Field
              name="firstName"
              component={textSetting}
              fieldName=""
            />
          </View>

          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
            <Text style={{marginLeft: 10, backgroundColor: '#ff9f43', color: 'white', padding: 8, fontSize: 20}}>Last Name</Text>
            <Field
              name="lastName"
              component={textSetting}
              fieldName=""
            />
          </View>

          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
            <Text style={{marginLeft: 10, backgroundColor: '#ff9f43', color: 'white', padding: 8, fontSize: 20}}>Email</Text>
            <Field
              name="email"
              component={textSetting}
              fieldName=""
            />
          </View>

          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
            <Text style={{marginLeft: 10, backgroundColor: '#ff9f43', color: 'white', padding: 8, fontSize: 20}}>Password</Text>
            <Field
              name="password"
              component={textSetting}
              fieldName=""
            />
          </View>

      </View>
  );
  }
}


export default reduxForm({
  form: 'settingform'
})(Settingform);
