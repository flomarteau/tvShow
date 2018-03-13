import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-elements'


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
    // var URL = 'http://127.0.0.1:3000/';
    var ctx = this;
    // fetch data from back route
    fetch('http://127.0.0.1:3000/movies')
      .then(function(response) {
        // console.log(response);
        return response.json();
      })
      // update current state with shows from the api
      .then(function(data) {
        ctx.setState({shows: data});
        // console.log(data);
      })
      // catcher error if there is any
      .catch(function(error) {
        console.log('Request failed', error);
      })
  }

  render() {

    var shows =[];
    // var imgMovie = "http://image.tmdb.org/t/p/original/";
    for (var i=0; i<this.state.shows.length; i++) {

    // shows.forEach(function(shows, i){
       shows.push(
         <Card
           key={i}
           title={this.state.shows[i].name}
           // image={require("http://image.tmdb.org/t/p/original/h1AaHftlM5Qp4qqHWJzFyDLtqxk.jpg")}
           // image={require('../images/robot-pro.png')}
          >
           <Text style={{marginBottom: 10}}>
             {this.state.shows[i].overview}
           </Text>
         </Card>
       );
     }


    return (
      <ScrollView style={styles.container}>

        { shows }

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
