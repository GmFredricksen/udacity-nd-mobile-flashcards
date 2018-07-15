import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  NavigationEventSubscription,
  NavigationEventPayload,
  NavigationScreenProp,
  NavigationParams,
} from 'react-navigation';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { getDeck } from '../utils/api';
import { Deck } from '../utils/seed-data';
import { setDeck } from '../actions';

interface DeckDetailsProps {
  deck: Deck,
  dispatch: Dispatch,
  navigation: NavigationScreenProp<NavigationParams>,
}

class DeckDetails extends Component<DeckDetailsProps> {
  willFocusListener: NavigationEventSubscription;

  constructor(props: DeckDetailsProps) {
    super(props);

    this.willFocusListener = props.navigation.addListener(
      'willFocus',
      (payload) => this._componentWillFocus(payload),
    );
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  _componentWillFocus = (_payload: NavigationEventPayload) => {
    const { dispatch } = this.props;
    const { deckName } = _payload.state.params;

    getDeck(deckName)
      .then((deck) => dispatch(setDeck(deck)));
  }

  render() {
    const { deck, navigation } = this.props;

    return (

      deck &&

      <View style={styles.detailView}>
        <Text>You have {(deck && deck.questions) && deck.questions.length} questions
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
        <TouchableOpacity onPress={() => navigation.navigate('QuizView', { deckName: deck.title })}>
          <View style={styles.buttonOutlined}>
            <Text>Start Quiz</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  detailView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20
  },
  buttonOutlined: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonItems: {
    width: 200,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  }
});

const mapStateToProps = ({ decks }: { decks: Deck[] }, ownProps: DeckDetailsProps) => {
  const { deckName } = ownProps.navigation.state.params;

  return {
    deck: decks[deckName],
  }
};

export default connect(
  mapStateToProps,
)(DeckDetails);
