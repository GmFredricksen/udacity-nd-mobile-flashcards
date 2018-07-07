import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import seedData from '../utils/seed-data';

interface DeckDetails {
  navigation: object,
}

class DeckDetails extends Component {
  render() {
    const { navigation } = this.props;
    const { deckName } = navigation.state.params;
    const deckObject = seedData.find((deck) => deck.title === deckName) || null;

    return (
      <View style={styles.detailView}>
        <Text>You have {deckObject && deckObject.questions.length} questions
          for {deckName}.
        </Text>
        <TouchableOpacity>
          <View style={styles.buttonItems}>
            <Text>
              <MaterialIcons name='add-to-photos' size={30}/>
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
