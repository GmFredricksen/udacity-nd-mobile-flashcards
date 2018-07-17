import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const QuizResult = () => {
  return (
    <View style={styles.quizResult}>
        <Text>RESULT</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  quizResult: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
});

export default QuizResult;
