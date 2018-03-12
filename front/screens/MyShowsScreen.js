import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class MyShowsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Shows',
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        <Text>
          Blabla mon espace perso
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
