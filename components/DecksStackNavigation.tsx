import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import DecksList from './DecksList';
import DeckDetails from './DeckDetails';

const DecksStackNavigation = createStackNavigator({
  Home: {
    screen: DecksList,
    navigationOptions: ({navigation}) => ({
      title: 'Your Decks',
      headerRight: <Button
        onPress={() => navigation.navigate('AddDeckModal')}
        title='+'
      />,
    }),
  },
  Details: {
    screen: DeckDetails,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deckName}`,
    }),
  },
});

export default DecksStackNavigation;
