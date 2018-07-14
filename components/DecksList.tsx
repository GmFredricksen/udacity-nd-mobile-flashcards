import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { NavigationScreenProp } from 'react-navigation';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getDecks } from '../utils/api';
import { obj2Arr } from '../utils/helpers';
import { setDecks } from '../actions';
import { Deck } from '../utils/seed-data';

interface DecksListProps {
  readonly navigation: NavigationScreenProp<{}>,
  decks: Array<Deck>,
  dispatch: Dispatch,
}

class DecksList extends Component<DecksListProps> {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then((decks) => dispatch(setDecks(decks)));
  }

  render() {
    const { decks, navigation } = this.props;

    return (
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={styles.listItemSeparator} />
        )}
        data={decks}
        renderItem={({ item }) => (
          item &&
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { deckName: item.title })}
            style={styles.listItem}
            key={item.key}
          >
            <Text>{item.title}</Text>
            <Text>
              {item.questions.length}
              {item.questions.length === 1 ? 'Card' : 'Cards'}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    height: 80,
    backgroundColor: '#c4efc7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#9cc19f",
  },
});

const mapStateToProps = ({ decks }: { decks: Deck}) => ({
  decks: obj2Arr(decks),
});

export default connect(
  mapStateToProps,
)(DecksList);
