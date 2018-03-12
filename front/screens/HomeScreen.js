import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Shows',
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        <Text>
          Blabla homepage
        </Text>

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
