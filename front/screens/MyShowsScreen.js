import React from 'react';
import { ScrollView, StyleSheet, Text, SegmentedControlIOS } from 'react-native';

export default class MyShowsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Shows',
  };

  render() {
    return (
      <ScrollView style={styles.container}>

        <SegmentedControlIOS
          style={styles.controller}
          tintColor={'#fa983a'}
          values={['Watching', 'Watchlist']}
          selectedIndex={0}
          onChange={(event) => {
            this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
          }}
        />

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
    marginRight: 30
  },
});
