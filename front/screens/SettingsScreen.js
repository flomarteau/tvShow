import React from 'react';
import { ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Overlay } from 'react-native-elements';

import Settingform from '../components/Settingform';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <ImageBackground style={{flex: 1}} source={require("../assets/images/milkyway.png")}>
        <ScrollView>
          <Overlay isVisible={true} height={370}  >
            <Settingform />
          </Overlay>
          </ScrollView>
      </ImageBackground>
    );
  }
}

export default SettingsScreen;
