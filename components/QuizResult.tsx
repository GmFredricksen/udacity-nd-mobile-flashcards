import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  NavigationActions,
  NavigationScreenProp,
  NavigationParams,
  StackActions,
} from 'react-navigation';

interface QuizResultProps {
  navigation: NavigationScreenProp<NavigationParams>,
}

class QuizResult extends Component<QuizResultProps> {
  restartQuizAndAdjustStack = () => {
    const { navigation } = this.props;
    const currentNavigationKey = navigation.state.key;
    const { deckName } = navigation.state.params;

    const replaceAction = StackActions.replace({
      key: currentNavigationKey,
      action: NavigationActions.navigate({ routeName: 'QuizView' }),
      routeName: 'QuizView',
      params: { deckName },
    });
    navigation.dispatch(replaceAction);
  }

  render() {
    return (
      <View style={styles.quizResult}>
        <Text>RESULT</Text>
        <TouchableOpacity onPress={() => this.restartQuizAndAdjustStack()}>
          <View style={styles.buttonOutlined}>
            <Text>Restart Quiz</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quizResult: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  buttonOutlined: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});

export default QuizResult;
