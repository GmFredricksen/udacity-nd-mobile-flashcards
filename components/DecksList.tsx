import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import seedData from '../utils/seed-data';

const DecksList: React.SFC<{ navigation }> = ({ navigation }) => (
  <FlatList
    ItemSeparatorComponent={() => (
      <View style={styles.listItemSeparator} />
    )}
    data={seedData}
    renderItem={({ item }) => (
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
)

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

export default DecksList;
