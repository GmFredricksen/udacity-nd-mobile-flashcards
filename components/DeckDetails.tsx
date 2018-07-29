import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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
import { commonStyles } from '../utils/common-styles';
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
        <View style={commonStyles.mainView}>
          <Text style={commonStyles.viewHeading}>{deck && deck.title}</Text>
          <View style={styles.detailInfo}>
            <MaterialCommunityIcons name='cards' size={70} />
            <Text>
              {(deck && deck.questions) && deck.questions.length}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('AddQuestionModal', { deckName: deck.title })}>
              <View style={[commonStyles.buttonOutlined, styles.buttonItems]}>
                <MaterialIcons name='add-to-photos' size={30} />
                <Text style={{ marginLeft: 5 }}>Add Card</Text>
              </View>
            </TouchableOpacity>

            {this.contentToRenderOnCardsCount(!!deck.questions.length)}
          </View>
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
          <View style={commonStyles.buttonOutlined}>
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
    flexDirection: 'row',
  },
  detailInfo: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
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
