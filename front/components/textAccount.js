import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

function textAccount(props) {
  const { input, fieldName } = props;
  return (
    <View>
      <Input
        onChangeText={input.onChange}
        value={input.value}
        placeholder={fieldName}
      />
    </View>
  );
}

export default textAccount;
