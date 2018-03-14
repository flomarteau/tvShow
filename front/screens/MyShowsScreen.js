import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import Login from '../components/Login';
import {connect} from 'react-redux';


class MyShowsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Shows',
  };

  render() {
    console.log(this.props.visible)
    return (
      <ScrollView>
        <View style ={{justifyContent: 'center', alignItems: 'center' }}>
          <Overlay isVisible={this.props.visible} height="auto" overlayStyle={{justifyContent: 'center', alignItems: 'center', marginBottom: 100}}>
            <Login />
          </Overlay>
        </View>
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

function mapStateToProps(state) {
  // console.log(state.loginAction.login)
  return { visible: state.loginAction.login }
}

export default connect(
    mapStateToProps,
    null
)(MyShowsScreen);
