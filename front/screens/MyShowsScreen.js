import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SegmentedControlIOS,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Button,
 } from 'react-native';
import { Overlay, Header, Badge, Divider } from 'react-native-elements';
import Login from '../components/Login';
import MyShowList from '../components/MyShowList';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';

class MyShowsScreen extends React.Component {
  static navigationOptions = {
    title: 'MY POPS',
    header: null
  };

  constructor() {
    super();
    this.setNewModalVisible = this.setNewModalVisible.bind(this);

    this.state = {
      myshows: [],
      status: 'watching',
      newmodalVisible: false,
      userId: null
    }
  }

  componentDidMount() {
    var ctx = this;
    fetch('http://10.2.1.60:3000/myshows')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        ctx.setState({myshows: data})
      })
      .catch(function(error) {
        console.log(('Request failed', error));
      })
  }

  setNewModalVisible(visible) {
    this.setState({
      newmodalVisible: visible,
    });
  }


  render() {

    var myshows =[];

    for (var i=0; i<this.props.watching.length; i++) {

      if(this.props.watching[i].status == this.state.status) {

      myshows.push(
        <MyShowList
          key={i}
          name={ this.props.watching[i].name }
          poster={ this.props.watching[i].poster }
          seasons={ this.props.watching[i].seasons }
          episodes={ this.props.watching[i].episodes }
          status={ this.props.watching[i].status }
          setNewModalVisible = {this.setNewModalVisible}
        />
      );

//       myshows.push(
//         <Modal
//           // key={i}
//           animationType="slide"
//           transparent={true}
//           visible={this.state.newmodalVisible}
//           onRequestClose={() => {
//             console.log('fermeture de modale');
//           }}
//         >
//
//            <View style={{
//                    marginTop: 100,
//                    marginLeft: 10,
//                    marginRight: 10,
//                    paddingTop: 20,
//                    paddingBottom: 20,
//                    alignItems: 'center',
//                    backgroundColor: 'white',
//                    height: 'auto',
//                    borderRadius: 20
//                  }}>
//
//                  <Badge containerStyle={{ backgroundColor: '#fa983a'}}>
//                    <Text style={{fontSize: 35, color: 'white', textAlign: 'center'}}>
//                      My TV Show flow
//                    </Text>
//                  </Badge>
//
//                  <Divider style={{ height: 80, backgroundColor: 'white' }} />
//
//                    <View style={{marginBottom: 60}}>
//                      <Button
//                        icon={
//                          <Icon
//                            name='bars'
//                            size={29}
//                            color='black'
//                          />
//                        }
//                        onPress={() => {this.setNewModalVisible(!this.state.newmodalVisible);}}
//                        title="Close"
//                        color="#fa983a"
//                        buttonStyle={{
//                          borderRadius: 100,
//                          padding: 5,
//                          width: 120,
//                          height: 45,
//                          margin: 10,
//                        }}
//                      />
//                    </View>
//
//             </View>
//
//         </Modal>
// );
    };
    };

    return (
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={{backgroundColor: '#fff', paddingTop: 35, paddingBottom: 15}}>
          <SegmentedControlIOS
            style={styles.controller}
            tintColor={'#fa983a'}
            values={['Watching', 'Watchlist']}
            selectedIndex={0}
            onChange={(event) => {
              var newState;
              if(this.state.status == "watching"){
                newState = "watchlist";
              } else {
                newState = "watching";
              }
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex, status: newState});
            }}
          />
        </View>
        { myshows }
        <View style ={{justifyContent: 'center', alignItems: 'center' }}>
          <Overlay
            isVisible={this.props.visible}
            height="auto"
            overlayStyle={{justifyContent: 'center', alignItems: 'center', marginBottom: 100}}
          >
            <Login />
          </Overlay>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  // console.log('test mapStateToProps MyShowsScreen', state);
  return {
    visible: !state.loginAction.login,
    watching: state.watching,
    userId: state.user,
  }
}

export default connect(
    mapStateToProps,
    null
)(MyShowsScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  controller: {
    marginLeft: 30,
    marginRight: 30,
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
