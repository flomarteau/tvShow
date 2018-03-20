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
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class MyShowList extends React.Component {

  render() {
    var showImg = { uri: this.props.poster };

    return(
      <TouchableOpacity
        onPress={() => console.log("test clic") }
        activeOpacity={0.8}
      >

       <ImageBackground source={ showImg } style={styles.imageBackground}>
         <Text style={[styles.text, styles.title]}>
           { this.props.title }
         </Text>
         <View style={styles.rating}>
           <Text style={[styles.text, styles.value]}>
             { this.props.seasons } saisons-
             { this.props.episodes } épisodes
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

function mapStateToProps(state) {
  // console.log(state.loginAction.login)
  return {
    visible: !state.loginAction.login,
    name: state.watching.title,
    poster: state.watching.poster,
    seasons: state.watching.seasons,
    episodes: state.watching.episodes,
  }
}

export default connect(
    mapStateToProps,
    null
)(MyShowList);
