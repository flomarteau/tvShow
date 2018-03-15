import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  Button,
  ImageBackground
} from 'react-native';
import { Card } from 'react-native-elements'


import ViewMoreText from 'react-native-view-more-text';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Shows',
    // header: null
  };

  constructor() {
    super();
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      shows: [],
      modalVisible: false
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    var ctx = this;
    // fetch data from back route
    fetch('http://10.2.1.60:3000/shows')
      .then(function(response) {
        // console.log(response);
        return response.json();
      })
      // update current state with shows from the api
      .then(function(data) {
        ctx.setState({shows: data});
        // console.log(data);
      })
      // catche error if there is any
      .catch(function(error) {
        console.log('Request failed', error);
      })
  }

  render() {

    var shows =[];

    for (var i=0; i<this.state.shows.length; i++) {
      var showImg = {uri: "http://image.tmdb.org/t/p/original" + this.state.shows[i].poster_path };
       shows.push(
       // <TouchableOpacity
       //   onPress={ () => {this.setModalVisible(true); }}
       //   activeOpacity={0.8}
       //   key={i}
       // >
       //   <Card
       //     key={i}
       //     title={this.state.shows[i].name}
       //     image={ showImg }
       //   >
       //
       //    <ViewMoreText
       //      numberOfLines={3}
       //      renderViewMore={this.renderViewMore}
       //      renderViewLess={this.renderViewLess}
       //    >
       //     <Text style={{marginBottom: 10}}>
       //       {this.state.shows[i].overview}
       //     </Text>
       //   </ViewMoreText>
       //
       //   </Card>
       // </TouchableOpacity>

       <TouchableOpacity
         onPress={ () => {this.setModalVisible(true); }}
         activeOpacity={0.8}
         key={i}
       >
        <ImageBackground source={ showImg } style={styles.imageBackground}>
          <Text style={[styles.text, styles.title]}>
            { this.state.shows[i].name.toUpperCase() }
          </Text>
          <View style={styles.rating}>
            <Text style={[styles.text, styles.value]}>
              Rating: { this.state.shows[i].vote_average }
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
       );
     }


    return (
      <ScrollView style={styles.container}>
        { shows }

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('fermeture de modale');
          }}>
          <View style={{paddingTop: 100}}>
            <View>
              <Text>
                SHOW NAME
              </Text>
              <Text>
                SHOW DESC
              </Text>

              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                title="Watching"
                color="#841584"
                // style={styles.modalButton}
              />


            </View>
          </View>
        </Modal>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff',
  },
  imageBackground: {
    height: 220,
    justifyContent: 'center',           // Center vertically
    alignItems: 'center',               // Center horizontally
  },
  // Shared text style
  text: {
    color: '#fff',                      // White text color
    backgroundColor: 'rgba(0, 0, 0, 0.3)',           
    fontFamily: 'Avenir',               // Change default font
    fontWeight: 'bold',                 // Bold font
    // Add text shadow
    textShadowColor: '#222',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  // Movie title
  title: {
    fontSize: 25,                       // Bigger font size
  },
  value: {
    fontSize: 16,                       // Smaller font size
  },
  // Rating row
  rating: {
    flexDirection: 'row',               // Arrange icon and rating in one line
  },
});
