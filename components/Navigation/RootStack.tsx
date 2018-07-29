import { createStackNavigator } from 'react-navigation';

import AddDeck from '../AddDeck';
import AddQuestion from '../AddQuestion';
import TabbedNavigation from './TabbedNavigation';

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
    headerMode: 'none',
    mode: 'modal',
  },
);

export default RootStack;
