import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

function textSetting(props) {
  const { input, fieldName, keyboardType, secureTextEntry, autoCapitalize } = props;
  return (
    <View>
      <Input
        inputStyle={{borderColor: 'black'}}
        onChangeText={input.onChange}
        value={input.value}
        placeholder={fieldName}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

export default textSetting;
