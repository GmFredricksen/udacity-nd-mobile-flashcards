import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TabbedNavigation from './TabbedNavigation';
import CustomStatusBar from '../CustomStatusBar';
import AddDeck from '../AddDeck';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#549c5a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: '#549c5a',
  },
});

const RootStack = createStackNavigator(
  {
    // Main: (
    //   <View style={styles.container}>
    //     <CustomStatusBar backgroundColor={styles.statusBar} barStyle="light-content" />
    //     <TabbedNavigation />
    //   </View>
    // ),
    Main: {
      screen: TabbedNavigation,
    },
    AddDeckModal: {
      screen: AddDeck,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default RootStack;
