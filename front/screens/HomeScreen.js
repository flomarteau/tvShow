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
import ShowList from '../components/ShowList';
import { connect } from 'react-redux';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Shows',
    header:
    <Header
      backgroundColor='#fa983a'
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'AVAILABLE SHOWS', style: { color: '#fff' } }}
      rightComponent={{ color: '#fff' }}
    />
  };

  constructor() {
    super();
    this.setModalVisible = this.setModalVisible.bind(this);
    this.addCurrentShow = this.addCurrentShow.bind(this);

    this.state = {
      shows: [],
      modalVisible: false,
      nameShowSelected: "",
      descriptionShowSelected: "",
      posterShowSelected: "",
      seasonsShowSelected: "",
      episodesShowSelected: "",
    }
  }

  setModalVisible(visible, title, description, poster, seasons, episodes) {
    // console.log(title);
    // console.log(description);
    this.setState({
      modalVisible: visible,
      nameShowSelected: title,
      descriptionShowSelected: description,
      posterShowSelected: poster,
      seasonsShowSelected: seasons,
      episodesShowSelected: episodes,
    });
  }

  addCurrentShow(title) {
    console.log('le bouton addCurrentShow fonctionne', title);
  }

  componentDidMount() {
    var ctx = this;
    // fetch data from back route
    fetch('http://10.2.1.63:3000/shows')
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

      shows.push(
        <ShowList
          key={i}
          title={ this.state.shows[i].title }
          description={ this.state.shows[i].description }
          poster={ this.state.shows[i].images.poster }
          setModalVisible={ this.setModalVisible }
          seasons={ this.state.shows[i].seasons }
          episodes={ this.state.shows[i].episodes }
          status={ this.state.shows[i].status }
        />
      );
    }

    shows.push(
      <Modal
        key={i}
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          console.log('fermeture de modale');
        }}
      >

         <View style={{marginTop: 100, marginLeft: 10, marginRight: 10, paddingTop: 50, paddingBottom: 50, alignItems: 'center', backgroundColor: 'white', height: 'auto', borderRadius: 20}}>

           <Text style={{fontSize: 50}}>
             {this.state.nameShowSelected}
           </Text>
           <Divider style={{ height: 25, backgroundColor: 'white' }} />
           <Text style={{fontSize: 20, margin: 10, padding: 15, borderWidth: 3, borderColor: '#fa983a', borderRadius: 40}}>
             {this.state.descriptionShowSelected}
           </Text>
           <Divider style={{ height: 25, backgroundColor: 'white' }} />
           <Button
             icon={
               <Icon
                 name='list'
                 size={20}
                 color='white'
               />
             }
             onPress={()=>{this.props.addCurrentShow(
               this.state.nameShowSelected,
               this.state.posterShowSelected,
               this.state.seasonsShowSelected,
               this.state.episodesShowSelected,
               'watching'
             )}}
             title='Add this TV Show'
             buttonStyle={{backgroundColor: "#fa983a"}}
           />

           {/* //Nouveau bouton */}
           <Button
             icon={
               <Icon
                 name='list'
                 size={20}
                 color='white'
               />
             }
             onPress={()=>{this.props.addCurrentShow(
               this.state.nameShowSelected,
               this.state.posterShowSelected,
               this.state.seasonsShowSelected,
               this.state.episodesShowSelected,
               'watchlist'
             )}}
             title='Add this TV Show to watchlist'
             buttonStyle={{backgroundColor: "#fa983a"}}
           />

           <Button
             icon={
               <Icon
                 name='list'
                 size={20}
                 color='white'
               />
             }
             onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
             title="Close the window"
             color="#fa983a"
             // style={styles.modalButton}
           />

         </View>

      </Modal>
    );

    if (this.state.modalVisible){
      return (
        <ScrollView style={styles.containerModalOpened}>
          { shows }
        </ScrollView>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          { shows }
        </ScrollView>
      );
    };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCurrentShow: function(title, poster, seasons, episodes, status) {
      console.log("test addCurrentShow");

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
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(HomeScreen);

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
