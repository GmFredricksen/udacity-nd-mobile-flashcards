import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator, NavigationScreenProp, NavigationParams } from 'react-navigation';

import DecksList from '../DecksList';
import DeckDetails from '../DeckDetails';
import Quiz from '../Quiz';
import QuizResult from '../QuizResult';

const DecksStackNavigation = createStackNavigator({
  Home: {
    screen: DecksList,
    navigationOptions: ({ navigation }: {navigation: NavigationScreenProp<{}>}) => ({
      title: 'Your Decks',
      headerRight: <Button
        onPress={() => navigation.navigate('AddDeckModal')}
        title='Add Deck'
      />,
    }),
  },
  Details: {
    screen: DeckDetails,
    navigationOptions: ({ navigation }: {navigation: NavigationScreenProp<NavigationParams>}) => ({
      title: `${navigation.state.params.deckName}`,
    }),
  },
  QuizView: {
    screen: Quiz,
    navigationOptions: ({ navigation }: {navigation: NavigationScreenProp<NavigationParams>}) => ({
      title: `Quiz - ${navigation.state.params.deckName}`,
    }),
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: ({ navigation }: {navigation: NavigationScreenProp<NavigationParams>}) => ({
      title: 'Result',
    }),
  },
});

export default DecksStackNavigation;
