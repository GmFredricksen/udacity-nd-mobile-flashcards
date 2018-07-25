import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import RootStack from './components/Navigation/RootStack';
import { setLocalNotification, setSeedData } from './utils/api';

class App extends Component<App> {
  componentDidMount() {
    setLocalNotification();
    setSeedData();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <RootStack />
      </Provider>
    );
  }
}

export default App;
