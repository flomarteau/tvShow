import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Login from '../components/Login';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style ={{justifyContent: 'center', alignItems: 'center' }}>
          <Login />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default SettingsScreen;
