import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Shows',
  };

  constructor() {
    super();
    this.state = {
      shows: []
    }
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/discover/tv?api_key=57d6fa067a2b6c52e97ec557f764514f&language=en-US&sort_by=vote_average.desc&without_genres=false&include_null_first_air_dates=false')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      this.setState(shows: data);
      console.log(this.state.shows);
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

  }

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
