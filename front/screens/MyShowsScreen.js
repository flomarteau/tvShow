import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Login from '../components/Login';

class MyShowsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Shows',
  };

  render() {
    return (
      <ScrollView>
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

export default MyShowsScreen;
