import React from 'react';
import { ScrollView, StyleSheet, Text, View, SegmentedControlIOS } from 'react-native';
import { Overlay, Header } from 'react-native-elements';
import Login from '../components/Login';
import {connect} from 'react-redux';

class MyShowsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Shows',
    header:null
    // <Header
    //   backgroundColor='#fa983a'
    //   leftComponent={{ icon: 'menu', color: '#fff' }}
    //   centerComponent={{ text: 'MY SHOWS', style: { color: '#fff' } }}
    //   rightComponent={{ color: '#fff' }}
    // />
  };

  render() {
    console.log(this.props.visible)
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
  controller: {
    marginLeft: 30,
    marginRight: 30,
  },
});

function mapStateToProps(state) {
  // console.log(state.loginAction.login)
  return { visible: !state.loginAction.login }
}

export default connect(
    mapStateToProps,
    null
)(MyShowsScreen);
