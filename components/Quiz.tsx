import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  StackActions,
} from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setCurrentQuiz } from '../actions';
import { initCurrentQuizData, setCurrentQuizData } from '../utils/api';
import { commonStyles } from '../utils/common-styles';
import { ICurrentQuiz, IDeck } from '../utils/seed-data';
import Card from './Card';

interface IQuizProps {
  currentQuiz: ICurrentQuiz;
  deck: IDeck;
  dispatch: Dispatch;
  navigation: NavigationScreenProp<NavigationParams>;
}
interface IQuizState {
  activeSlide: number;
  currentQuiz: ICurrentQuiz;
}

class Quiz extends Component<IQuizProps, IQuizState> {
  public state = {
    activeSlide: 0,
    currentQuiz: {
      correctAnswers: 0,
      dateWhenPlayed: '',
      deckTitle: '',
      totalQuestions: 0,
      wrongAnswers: 0,
    },
  };
  private carouselInstance: Carousel;

  public componentDidMount() {
    const { deck, dispatch } = this.props;

    initCurrentQuizData(deck)
      .then((currentQuiz) => {
        dispatch(setCurrentQuiz(currentQuiz));
        this.setState({ currentQuiz });
      });
  }

  public render() {
    const { deck } = this.props;
    const { width } = Dimensions.get('window');

    return (
      <View style={commonStyles.mainView}>
        {this.cardCounterComponent()}
        <Carousel
          ref={(c: Carousel) => { this.carouselInstance = c; }}
          data={deck.questions}
          renderItem={({ item }) => <Card data={item} />}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          sliderWidth={width - 10}
          itemWidth={width - 10}
          scrollEnabled={false}
        />
        <TouchableOpacity onPress={() => this.isAnswerOnCardCorrect(true)}>
          <View style={[styles.buttonCorrect, commonStyles.buttonBase]}>
            <Text style={{ color: 'white' }}>Correct</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.isAnswerOnCardCorrect(false)}>
          <View style={[styles.buttonIncorrect, commonStyles.buttonBase]}>
            <Text style={{ color: 'white' }}>Incorrect</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  private cardCounterComponent = () => (
    <Text>{this.state.activeSlide + 1} / {this.props.deck.questions.length}</Text>
  )

  private isAnswerOnCardCorrect = (hasUserAnsweredCorrectly: boolean) => {
    let propToUpdate = '';
    let countToUpdate: number;

    this.setState((prevState) => {
      const { currentQuiz } = prevState;
      const { correctAnswers, wrongAnswers } = currentQuiz;

      if (hasUserAnsweredCorrectly) {
        propToUpdate = 'correctAnswers';
        countToUpdate = correctAnswers + 1;
      } else {
        propToUpdate = 'wrongAnswers';
        countToUpdate = wrongAnswers + 1;
      }

      return {
        ...prevState,
        currentQuiz: {
          ...currentQuiz,
          [propToUpdate]: countToUpdate,
        },
      };
    }, () => {
      this.goToNextStep();
    });
  }

  private goToNextStep = () => {
    const { deck } = this.props;
    const { activeSlide } = this.state;
    const currentSelectedCard = activeSlide + 1;

    (currentSelectedCard < deck.questions.length)
      ? this.carouselInstance.snapToNext()
      : this.updateCurrentQuiz();
  }

  private updateCurrentQuiz = () => {
    const { dispatch } = this.props;
    const { currentQuiz } = this.state;

    setCurrentQuizData(currentQuiz)
      .then((quiz) => {
        dispatch(setCurrentQuiz(quiz));
        this.goToQuizResultAndAdjustStack();
      });
  }

  private goToQuizResultAndAdjustStack = () => {
    const { navigation } = this.props;
    const currentNavigationKey = navigation.state.key;
    const { deckName } = navigation.state.params;

    const replaceAction = StackActions.replace({
      action: NavigationActions.navigate({ routeName: 'QuizResult' }),
      key: currentNavigationKey,
      params: { deckName },
      routeName: 'QuizResult',
    });
    navigation.dispatch(replaceAction);
  }
}

const styles = StyleSheet.create({
  buttonCorrect: {
    backgroundColor: 'green',
  },
  buttonIncorrect: {
    backgroundColor: 'red',
  },
});

const mapStateToProps = (
  { currentQuiz, decks }: { currentQuiz: ICurrentQuiz, decks: IDeck[] },
  ownProps: IQuizProps,
) => {
  const { deckName } = ownProps.navigation.state.params;

  return {
    currentQuiz,
    deck: decks[deckName],
  };
};

export default connect(
  mapStateToProps,
)(Quiz);
