import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import DecksStackNavigation from './DecksStackNavigation';

const TabbedNavigation = createBottomTabNavigator({
  Decks: {
    navigationOptions: {
      tabBarIcon: <MaterialIcons name='list' size={30}/>,
      tabBarLabel: 'Decks',
      title: 'Home',
    },
    screen: DecksStackNavigation,
  },
}, {
  navigationOptions: {
    title: 'Home',
  },
  tabBarOptions: {
    activeTintColor: '#fff',
    style: {
      backgroundColor: '#549c5a',
      height: 55,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        height: 3,
        width: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
      width: '100%',
    },
  },
});

export default TabbedNavigation;
