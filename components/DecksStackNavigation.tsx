import { createStackNavigator } from 'react-navigation';

import DecksList from './DecksList';
import DeckDetails from './DeckDetails';

const DecksStackNavigation = createStackNavigator({
  Home: {
    screen: DecksList,
    navigationOptions: () => ({
      title: 'Your Decks',
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
