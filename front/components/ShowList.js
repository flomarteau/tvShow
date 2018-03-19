import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  ImageBackground
} from 'react-native';
import { Card, Header, Divider, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ShowList extends React.Component {


  render(){
    var showImg = {uri: "http://image.tmdb.org/t/p/original" + this.props.poster_path };

    return(

<TouchableOpacity
  onPress={ () => {  this.props.setModalVisible(true, this.props.name, this.props.overview ) }}
  activeOpacity={0.8}
>
 <ImageBackground source={ showImg } style={styles.imageBackground}>
   <Text style={[styles.text, styles.title]}>
     { this.props.name.toUpperCase() }
   </Text>
   <View style={styles.rating}>
     <Text style={[styles.text, styles.value]}>
       Rating: { this.props.vote_average }
     </Text>
   </View>
 </ImageBackground>



</TouchableOpacity>

)
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerModalOpened: {
    opacity: 0.2,
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackgroundModal: {
    height: 600,
    opacity: 0.2,
    justifyContent: 'center',           // Center vertically
    alignItems: 'center',               // Center horizontally
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
