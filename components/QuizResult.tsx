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
import { commonStyles } from '../utils/common-styles';
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
      <View style={commonStyles.mainView}>
        <View>
          <Text style={commonStyles.viewHeading}>{deckName}</Text>
        </View>
        <View style={styles.resultFeedback}>
          <Text>You've successfully answered</Text>
          <Text>{correctAnswers} out of {totalQuestions}</Text>
          <Text>questions</Text>
        </View>
        <TouchableOpacity onPress={() => this.restartQuizAndAdjustStack()}>
          <View style={commonStyles.buttonOutlined}>
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
  resultFeedback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ currentQuiz }: { currentQuiz: ICurrentQuiz }) => ({
  currentQuiz,
});

export default connect(
  mapStateToProps,
)(QuizResult);
