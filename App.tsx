import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import RootStack from './components/Navigation/RootStack';
import { setSeedData } from './utils/seed-data';

class App extends Component<App> {
  componentDidMount() {
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
