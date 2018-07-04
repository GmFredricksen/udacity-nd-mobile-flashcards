import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import CustomStatusBar from './components/CustomStatusBar';
import TabbedNavigation from './components/TabbedNavigation';

// const MainNavigation = createStackNavigator({
//   Home: {
//     screen: TabbedNavigation,
//   },
// });

class App extends Component<App> {
  render() {
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor={styles.statusBar} barStyle="light-content" />
        <TabbedNavigation />
      </View>
    );
  }
}

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

export default App;
