import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  StackActions,
} from 'react-navigation';
import { connect } from 'react-redux';

import { clearLocalNotification, setLocalNotification } from '../utils/api';
import { ICurrentQuiz } from '../utils/seed-data';

interface IQuizResultProps {
  currentQuiz: ICurrentQuiz;
  navigation: NavigationScreenProp<NavigationParams>;
}

class QuizResult extends Component<IQuizResultProps> {
  public componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  public render() {
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
    );
  }

  private restartQuizAndAdjustStack = () => {
    const { navigation } = this.props;
    const currentNavigationKey = navigation.state.key;
    const { deckName } = navigation.state.params;

    const replaceAction = StackActions.replace({
      action: NavigationActions.navigate({ routeName: 'QuizView' }),
      key: currentNavigationKey,
      params: { deckName },
      routeName: 'QuizView',
    });
    navigation.dispatch(replaceAction);
  }
}

const styles = StyleSheet.create({
  buttonOutlined: {
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: 200,
  },
  quizResult: {
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'space-around',
    padding: 20,
  },
});

const mapStateToProps = ({ currentQuiz }: { currentQuiz: ICurrentQuiz }) => ({
  currentQuiz,
});

export default connect(
  mapStateToProps,
)(QuizResult);
