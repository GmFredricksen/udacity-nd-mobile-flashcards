import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator, NavigationParams, NavigationScreenProp } from 'react-navigation';

import DeckDetails from '../DeckDetails';
import DecksList from '../DecksList';
import Quiz from '../Quiz';
import QuizResult from '../QuizResult';

const DecksStackNavigation = createStackNavigator({
  Home: {
    navigationOptions: ({ navigation }: { navigation: NavigationScreenProp<{}> }) => ({
      headerRight: (
        <Button
          onPress={() => navigation.navigate('AddDeckModal')}
          title='Add Deck'
        />
      ),
      title: 'Your Decks',
    }),
    screen: DecksList,
  },
  DeckDetails: {
    navigationOptions: ({ navigation }: { navigation: NavigationScreenProp<NavigationParams> }) => ({
      title: `${navigation.state.params.deckName}`,
    }),
    screen: DeckDetails,
  },
  QuizView: {
    navigationOptions: ({ navigation }: { navigation: NavigationScreenProp<NavigationParams> }) => ({
      title: `Quiz - ${navigation.state.params.deckName}`,
    }),
    screen: Quiz,
  },
  QuizResult: {
    navigationOptions: ({ navigation }: { navigation: NavigationScreenProp<NavigationParams> }) => ({
      title: 'Result',
    }),
    screen: QuizResult,
  },
});

export default DecksStackNavigation;
