import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Card = ({ data }) => {
  return (
    <View style={styles.card}>
        <Text>{ data.question }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
  },
});

export default Card;
