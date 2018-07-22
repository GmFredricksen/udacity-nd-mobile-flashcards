import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  NavigationActions,
  NavigationScreenProp,
  NavigationParams,
  StackActions,
} from 'react-navigation';

import { CurrentQuiz } from '../utils/seed-data';

interface QuizResultProps {
  currentQuiz: CurrentQuiz,
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
    const { currentQuiz, navigation } = this.props;
    const { deckName } = navigation.state.params;
    const { correctAnswers, totalQuestions } = currentQuiz;

    return (
      <View style={styles.quizResult}>
        <Text>Results for {deckName} Quiz</Text>
        <Text>You've successfully answered</Text>
        <Text>{correctAnswers} out of {totalQuestions} questions</Text>
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

const mapStateToProps = ({ currentQuiz }: { currentQuiz: CurrentQuiz }) => ({
  currentQuiz,
})

export default connect(
  mapStateToProps,
)(QuizResult);
