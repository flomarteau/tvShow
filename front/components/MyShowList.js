import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground
} from 'react-native';
import { Card, Header, Divider, Button } from 'react-native-elements'
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class MyShowList extends React.Component {

  addCurrentShow(title, poster, seasons, episodes, status) {
    this.setState({
      nameShowSelected: title,
      posterShowSelected: poster,
      seasonsShowSelected: seasons,
      episodesShowSelected: episodes,
      statusShowSelected: status,
    });
  }

  switchStatusShow() {
    var ctx = this;
    fetch('http://10.2.1.60:3000/updateshowstatus', {
      method: 'PUT',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'status=' + req.body.status
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(status) {
      ctx.setState({statusShowSelected: status})
    })
    .catch(function(error) {
      console.log(('Request failed', error));
    })
  }

  deleteShow() {
    fetch('http://10.2.1.60/3000/deleteshow', {
      method: 'DELETE'
    });
  }

  render() {
    var showImg = { uri: this.props.poster };
    var switchButton;

    if(this.props.status == 'watching'){
      switchButton =
      <View
        style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
      <Button
        icon={
          <Icon
            name='arrow-right'
            size={25}
            color='white'
          />
        }
        onPress={()=>{this.props.switchStatusShow(
          this.props.name,
          'watchlist'
        )}}
        title='' // Switch to Watchlist
        buttonStyle={{backgroundColor: "#fa983a", paddingLeft: 15, paddingTop: 8, paddingBottom: 8, marginRight: 5}}
      />

      {/* Ci-dessous le bouton pour afficher une nouvelle modale */}
      {/* <Button
        icon={
          <Icon
            name='bookmark'
            size={29}
            color='white'
          />
        }
        onPress={()=>{this.props.setNewModalVisible(
          true
        )}}
        title='' //Avancement dans la série
        buttonStyle={{backgroundColor: "#fa983a", paddingLeft: 15, paddingTop: 8, paddingBottom: 8, marginLeft: 10, marginRight: 10}}
      /> */}
      {/* fin du bouton pour afficher la nouvelle modale */}

      <Button
        icon={
          <Icon
            name='trash'
            size={25}
            color='white'
          />
        }
        onPress={()=>{this.props.deleteShow(
          this.props.name
        )}}
        title='' // Delete
        buttonStyle={{backgroundColor: "#fa983a", paddingLeft: 15, paddingTop: 8, paddingBottom: 8, marginLeft: 5}}
      />

    </View>

    } else if(this.props.status == 'watchlist') {
      switchButton =
      <View
        style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
      <Button
        icon={
          <Icon
            name='arrow-left'
            size={25}
            color='white'
          />
        }
        onPress={()=>{this.props.switchStatusShow(
          this.props.name,
          'watching'
        )}}
        title='' // Switch to Watching
        buttonStyle={{backgroundColor: "#fa983a", paddingLeft: 15, paddingTop: 8, paddingBottom: 8, marginRight: 10}}
      />
      <Button
        icon={
          <Icon
            name='trash'
            size={25}
            color='white'
          />
        }
        onPress={()=>{this.props.deleteShow(
          this.props.name
        )}}
        title='' // Delete
        buttonStyle={{backgroundColor: "#fa983a", paddingLeft: 15, paddingTop: 8, paddingBottom: 8}}
      />
    </View>
    }

    return(
      <TouchableOpacity
        onPress={() => console.log("test clic") }
        activeOpacity={0.8}
      >

        <ImageBackground source={ showImg } style={styles.imageBackground}>
          <Text style={[styles.text, styles.title]}>
            { this.props.name.toUpperCase() }
          </Text>
          <View style={styles.rating}>
            <Text style={[styles.text, styles.value]}>
              { this.props.seasons } saisons-
              { this.props.episodes } épisodes
            </Text>
          </View>
          {switchButton}
        </ImageBackground>

      </TouchableOpacity>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state.loginAction.login)
  return {
    visible: !state.loginAction.login,
    watching: state.watching,
    switchToWatchlist: state.switchToWatchlist,
    switchToWatching: state.switchToWatching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCurrentShow: function(title, poster, seasons, episodes, status) {

      // fetch('https://jsonplaceholder.typicode.com/users', {
      //   method: 'POST',
      //   headers: {'Content-Type':'application/x-www-form-urlencoded'},
      //   body: 'name=john&username=doe&email=john@gmail.com'
      // }).then(function(response) {
      //     return response.json();
      // })
      // .then(function(data) {
      //     console.log(data);
      // }).catch(function(error) {
      //     console.log('Request failed', error)
      // });

      dispatch({
        type: 'watching',
        name: title,
        poster: poster,
        seasons: seasons,
        episodes: episodes,
        status: status
      });
    },
    switchStatusShow: function(title, status){
      dispatch({
        type: 'switchStatusShow',
        name: title,
        status: status,
      });
    },
    deleteShow: function(title){
      console.log("deleteShow");
      dispatch({
        type: 'deleteShow',
        name: title
      });
    }
  }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyShowList);


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
    fontSize: 25,
    marginTop: 45                    // Bigger font size
  },
  value: {
    fontSize: 16,                       // Smaller font size
  },
  // Rating row
  rating: {
    flexDirection: 'row',               // Arrange icon and rating in one line
  },
});
