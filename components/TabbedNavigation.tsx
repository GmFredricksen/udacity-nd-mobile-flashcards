import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import DecksStackNavigation from './DecksStackNavigation';

const TabbedNavigation = createBottomTabNavigator({
  Decks: {
    screen: DecksStackNavigation,
    navigationOptions: {
      tabBarLabel: 'Decks',
      title: 'Home',
      tabBarIcon: <MaterialIcons name='list' size={30}/>
    },
  },
}, {
  navigationOptions: {
    title: 'Home',
  },
  tabBarOptions: {
    activeTintColor: '#fff',
    style: {
      height: 55,
      width: '100%',
      backgroundColor: '#549c5a',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
});

export default TabbedNavigation;
