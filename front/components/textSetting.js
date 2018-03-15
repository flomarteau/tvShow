import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

function textSetting(props) {
  const { input, fieldName } = props;
  return (
    <View>
      <Input
        inputStyle={{borderColor: 'black'}}
        onChangeText={input.onChange}
        value={input.value}
        placeholder={fieldName}
      />
    </View>
  );
}

export default textSetting;
