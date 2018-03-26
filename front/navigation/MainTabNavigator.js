import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import MyShowsScreen from '../screens/MyShowsScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default TabNavigator(
  {
    Shows: {
      screen: MyShowsScreen,
    },
    MyShows: {
      screen: HomeScreen,
    },
    // Settings: {
    //   screen: SettingsScreen,
    // },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'MyShows':
            iconName =
              Platform.OS === 'ios'
                ? `ios-film${focused ? '' : '-outline'}`
                : 'md-film';
            break;
          case 'Shows':
            iconName = Platform.OS === 'ios' ? `ios-happy${focused ? '' : '-outline'}` : 'md-happy';
            break;
          // case 'Settings':
          //   iconName =
          //     Platform.OS === 'ios' ? `ios-construct${focused ? '' : '-outline'}` : 'md-construct';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
  }
);
