import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  NavigationActions,
  NavigationScreenProp,
  NavigationParams,
  StackActions,
} from 'react-navigation';
import Carousel from 'react-native-snap-carousel';

import Card from './Card';
import { initCurrentQuizData, setCurrentQuizData } from '../utils/api';
import { setCurrentQuiz } from '../actions';
import { CurrentQuiz, Deck } from '../utils/seed-data';

interface QuizProps {
  currentQuiz: CurrentQuiz,
  deck: Deck,
  dispatch: Dispatch,
  navigation: NavigationScreenProp<NavigationParams>,
}
interface QuizState {
  activeSlide: number,
  currentQuiz: CurrentQuiz,
}

class Quiz extends Component<QuizProps, QuizState> {
  carouselInstance: Carousel;

  state = {
    activeSlide: 0,
    currentQuiz: {
      deckTitle: '',
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      dateWhenPlayed: '',
    },
  }

  componentDidMount() {
    const { deck, dispatch } = this.props;

    initCurrentQuizData(deck)
      .then((currentQuiz) => {
        dispatch(setCurrentQuiz(currentQuiz));
        this.setState({ currentQuiz });
      });
  }

  cardCounterComponent = () => (
    <Text>{this.state.activeSlide + 1} / {this.props.deck.questions.length}</Text>
  )

  isAnswerOnCardCorrect = (doesUserThinkIsCorrect: boolean) => {
    const { deck } = this.props;
    let propToUpdate = '';
    let countToUpdate: number;
    
    this.setState((prevState) => {
      const { activeSlide, currentQuiz } = prevState;
      const { correctAnswers, wrongAnswers } = currentQuiz;
      const isUserAnswerCorrect = deck.questions[activeSlide].result === doesUserThinkIsCorrect;

      if (isUserAnswerCorrect) {
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
        }
      }
    }, () => {
      this.goToNextStep();
    });
  }

  goToNextStep = () => {
    const { deck } = this.props;
    const { activeSlide } = this.state;
    const currentSelectedCard = activeSlide + 1;

    (currentSelectedCard < deck.questions.length)
      ? this.carouselInstance.snapToNext()
      : this.updateCurrentQuiz();
  }

  updateCurrentQuiz = () => {
    const { dispatch } = this.props;
    const { currentQuiz } = this.state;

    setCurrentQuizData(currentQuiz)
      .then((currentQuiz) => {
        dispatch(setCurrentQuiz(currentQuiz));
        this.goToQuizResultAndAdjustStack();
      });
  }

  goToQuizResultAndAdjustStack = () => {
    const { navigation } = this.props;
    const currentNavigationKey = navigation.state.key;
    const { deckName } = navigation.state.params;

    const replaceAction = StackActions.replace({
      key: currentNavigationKey,
      action: NavigationActions.navigate({ routeName: 'QuizResult' }),
      routeName: 'QuizResult',
      params: { deckName },
    });
    navigation.dispatch(replaceAction);
  }

  render() {
    const { deck } = this.props;
    const { width } = Dimensions.get('window');

    return (
      <View style={styles.quizView}>
        {this.cardCounterComponent()}
        <Carousel
          ref={(c) => { this.carouselInstance = c; }}
          data={deck.questions}
          renderItem={({ item }) => <Card data={item} />}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          sliderWidth={width - 10}
          itemWidth={width - 10}
          scrollEnabled={false}
        />
        <TouchableOpacity onPress={() => this.isAnswerOnCardCorrect(true)}>
          <View style={styles.buttonCorrect}>
            <Text style={{ color: 'white' }}>Correct</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.isAnswerOnCardCorrect(false)}>
          <View style={styles.buttonIncorrect}>
            <Text style={{ color: 'white' }}>Incorrect</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quizView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20
  },
  buttonCorrect: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  buttonIncorrect: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

const mapStateToProps = ({ currentQuiz, decks }: { currentQuiz: CurrentQuiz, decks: Deck[] }, ownProps: QuizProps) => {
  const { deckName } = ownProps.navigation.state.params;

  return {
    currentQuiz,
    deck: decks[deckName],
  }
};

export default connect(
  mapStateToProps,
)(Quiz);
