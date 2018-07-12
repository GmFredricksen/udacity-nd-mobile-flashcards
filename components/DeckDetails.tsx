import React, { Component } from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { getDeck } from '../utils/api';
import { Deck } from '../utils/seed-data';

interface DeckDetailsProps {
  navigation: NavigationScreenProp<NavigationParams>,
}

class DeckDetails extends Component<DeckDetailsProps> {
  state = {
    deck: {} as Deck,
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { deckName } = navigation.state.params;

    getDeck(deckName)
      .then((deck) => this.setState({ deck }));
  }

  render() {
    const deckObject: Deck = this.state.deck || null;
    const { navigation } = this.props;

    return (
      <View style={styles.detailView}>
        <Text>You have {deckObject.questions && deckObject.questions.length} questions
          for {deckObject.title}.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddQuestionModal')}>
          <View style={styles.buttonItems}>
            <Text>
              <MaterialIcons name='add-to-photos' size={30} />
              Add Card
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
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

export default DeckDetails;
