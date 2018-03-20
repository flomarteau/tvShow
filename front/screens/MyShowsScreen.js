import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SegmentedControlIOS,
  TouchableOpacity,
  ImageBackground
 } from 'react-native';
import { Overlay, Header } from 'react-native-elements';
import Login from '../components/Login';
import MyShowList from '../components/MyShowList';

import {connect} from 'react-redux';

class MyShowsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Shows',
    header: null
  };

  constructor() {
    super();
    this.state = {
      myshows: [],
    }
  }

  render() {

    var myshows =[];
    console.log(this.props.watching);
    for (var i=0; i<this.props.watching.length; i++) {

      myshows.push(
        <MyShowList
          key={i}
          name={ this.props.watching[i].name }
          poster={ this.props.watching[i].poster }
          seasons={ this.props.watching[i].seasons }
          episodes={ this.props.watching[i].episodes }
        />
      );

    };

    // console.log(this.props.visible)
    return (
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={{backgroundColor: '#fff', paddingTop: 35, paddingBottom: 15}}>
          <SegmentedControlIOS
            style={styles.controller}
            tintColor={'#fa983a'}
            values={['Watching', 'Watchlist']}
            selectedIndex={0}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
          />
        </View>
        { myshows }
        <View style ={{justifyContent: 'center', alignItems: 'center' }}>
          <Overlay isVisible={this.props.visible} height="auto" overlayStyle={{justifyContent: 'center', alignItems: 'center', marginBottom: 100}}>
            <Login />
          </Overlay>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  //console.log('test', state);
  return {
    visible: !state.loginAction.login,
    watching: state.watching
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
