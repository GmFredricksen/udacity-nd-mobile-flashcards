import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setDecks } from '../actions';
import { getDecks } from '../utils/api';
import { obj2Arr } from '../utils/helpers';
import { IDeck } from '../utils/seed-data';

interface IDecksListProps {
  readonly navigation: NavigationScreenProp<{}>;
  decks: IDeck[];
  dispatch: Dispatch;
}

class DecksList extends Component<IDecksListProps> {
  public componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then((decks) => dispatch(setDecks(decks)));
  }

  public render() {
    const { decks } = this.props;

    return (
      <FlatList
        ItemSeparatorComponent={this.listItemSeparator}
        data={decks}
        renderItem={this.listItem}
      />
    );
  }

  private listItemSeparator = () => (
    <View style={styles.listItemSeparator} />
  )
  private listItem = ({ item }: {item: IDeck}) => (
    item &&
    (
      <TouchableOpacity
        onPress={() => this.navigateToDeckDtls(item)}
        style={styles.listItem}
        key={item.key}
      >
        <View>
          <Text>{item.title}</Text>
        </View>
        <View style={styles.listItemIconRight}>
          <Text>
            {item.questions.length}
          </Text>
          <MaterialCommunityIcons name='cards' size={20} />
        </View>
      </TouchableOpacity>
    )
  )
  private navigateToDeckDtls = (item: IDeck) => {
    const { navigation } = this.props;

    navigation.navigate('Details', { deckName: item.title });
  }
}

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: '#c4efc7',
    flex: 1,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'center',
  },
  listItemIconRight: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    position: 'absolute',
    right: 10,
  },
  listItemSeparator: {
    backgroundColor: '#9cc19f',
    height: 1,
    width: '100%',
  },
});

const mapStateToProps = ({ decks }: { decks: IDeck }) => ({
  decks: obj2Arr(decks),
});

export default connect(
  mapStateToProps,
)(DecksList);
