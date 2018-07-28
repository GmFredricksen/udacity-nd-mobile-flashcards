import { MaterialIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationEventPayload,
  NavigationEventSubscription,
  NavigationParams,
  NavigationScreenProp,
} from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setDeck } from '../actions';
import { getDeck } from '../utils/api';
import { IDeck } from '../utils/seed-data';

interface IDeckDetailsProps {
  deck: IDeck;
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationParams>;
}

class DeckDetails extends Component<IDeckDetailsProps> {
  private willFocusListener: NavigationEventSubscription;

  constructor(props: IDeckDetailsProps) {
    super(props);

    this.willFocusListener = props.navigation.addListener(
      'willFocus',
      (payload) => this.componentWillFocus(payload),
    );
  }

  public componentWillUnmount() {
    this.willFocusListener.remove();
  }

  public render() {
    const { deck, navigation } = this.props;

    return (

      deck &&

      (
        <View style={styles.detailView}>
          <Text>You have {(deck && deck.questions) && deck.questions.length} Cards
          for {deck.title}.
        </Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddQuestionModal', { deckName: deck.title })}>
            <View style={styles.buttonItems}>
              <Text>
                <MaterialIcons name='add-to-photos' size={30} />
                Add Card
            </Text>
            </View>
          </TouchableOpacity>

          {this.contentToRenderOnCardsCount(!!deck.questions.length)}
        </View>
      )
    );
  }

  private componentWillFocus = (payload: NavigationEventPayload) => {
    const { dispatch } = this.props;
    const { deckName } = payload.state.params;

    getDeck(deckName)
      .then((deck) => dispatch(setDeck(deck)));
  }

  private contentToRenderOnCardsCount = (areThereCardsAvailable: boolean) => {
    const { deck, navigation } = this.props;

    if (areThereCardsAvailable) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('QuizView', { deckName: deck.title })}>
          <View style={styles.buttonOutlined}>
            <Text>Start Quiz</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        <Text>
          🤔 Mmh... Add at least 1 Card to be able to start a Quiz.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonItems: {
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    width: 200,
  },
  buttonOutlined: {
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: 200,
  },
  detailView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
});

const mapStateToProps = ({ decks }: { decks: IDeck[] }, ownProps: IDeckDetailsProps) => {
  const { deckName } = ownProps.navigation.state.params;

  return {
    deck: decks[deckName],
  };
};

export default connect(
  mapStateToProps,
)(DeckDetails);
