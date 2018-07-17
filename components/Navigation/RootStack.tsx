import { createStackNavigator } from 'react-navigation';

import TabbedNavigation from './TabbedNavigation';
import AddDeck from '../AddDeck';
import AddQuestion from '../AddQuestion';

const RootStack = createStackNavigator(
  {
    Main: {
      screen: TabbedNavigation,
    },
    AddDeckModal: {
      screen: AddDeck,
    },
    AddQuestionModal: {
      screen: AddQuestion,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default RootStack;
