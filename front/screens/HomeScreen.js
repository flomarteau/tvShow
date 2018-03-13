import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Button, Header } from 'react-native-elements'

import ViewMoreText from 'react-native-view-more-text';

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

  renderViewMore(onPress){
    return(
      <Text onPress={onPress} style={{color:'#fa983a'}}>
        Read more
      </Text>
    )
  }

  renderViewLess(onPress){
    return(
      <Text onPress={onPress} style={{color:'#fa983a'}}>
        Read less
      </Text>
    )
  }


  componentDidMount() {
    // var URL = 'http://127.0.0.1:3000/';
    var ctx = this;
    // fetch data from back route
    fetch('http://127.0.0.1:3000/shows')
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
    for (var i=0; i<this.state.shows.length; i++) {

    var showRoot = "http://image.tmdb.org/t/p/original";
       shows.push(
         <Card
           key={i}
           title={this.state.shows[i].name}
           // image={require("http://image.tmdb.org/t/p/original/h1AaHftlM5Qp4qqHWJzFyDLtqxk.jpg")}
           // image={require(showImg + this.state.shows[i].poster_path)}
           image={{uri: showRoot}}
          >
          <ViewMoreText
            numberOfLines={3}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}
          >
           <Text style={{marginBottom: 10}}>
             {this.state.shows[i].overview}
           </Text>
         </ViewMoreText>

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
