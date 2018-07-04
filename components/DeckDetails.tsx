import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import seedData from '../utils/seed-data';

interface DeckDetails {
  navigation: object,
}

class DeckDetails extends Component {
  render() {
    const { navigation } = this.props;
    const { deckName } = navigation.state.params;
    const deckObject = seedData.find((deck) => deck.title === deckName ) || null;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>You have {deckObject && deckObject.questions.length} questions
          for {deckName} subject. 
        </Text>
      </View>
    )
  }
};

export default DeckDetails;
