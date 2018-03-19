import React from 'react';
import { ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Overlay, Header } from 'react-native-elements';
import {connect} from 'react-redux';
import Settingform from '../components/Settingform';


class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    header: null

  };

  constructor(){
    super();
    this.submitSettings = this.submitSettings.bind(this);
  }

  submitSettings(values){
   console.log("Le bouton du settings fonctionne");
   console.log('values', values);
   fetch('http://10.2.1.63:3000/update', {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'firstName=' + values.firstName + '&lastName=' + values.firstName + '&email=' + values.email + '&password=' + values.password
      }).then(function(response) {
          return response.json();
      })
      .then(function(data) {
          console.log(data);
      }).catch(function(error) {
          console.log('Request failed', error)
      });
        }

  render() {
    return (
      <ImageBackground style={{flex: 1}} source={require("../assets/images/milkyway.png")}>
        <ScrollView stickyHeaderIndices={[0]}>
          <Header
            backgroundColor='#fa983a'
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'MY PROFILE', style: { color: '#fff' } }}
            rightComponent={{ color: '#fff' }}
          />

          <Overlay isVisible={this.props.visible} height="auto" overlayStyle={{marginBottom: 130}}>
            <Settingform onSubmit={this.submitSettings} />
          </Overlay>
          </ScrollView>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state.loginAction.login)
  return { visible: !state.loginAction.login }
}

export default connect(
    mapStateToProps,
    null
)(SettingsScreen);
