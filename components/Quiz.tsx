import React, { Component } from 'react';
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
import { Deck } from '../utils/seed-data';

interface QuizProps {
  deck: Deck,
  navigation: NavigationScreenProp<NavigationParams>,
}

class Quiz extends Component<QuizProps> {
  carouselInstance: Carousel;

  state = {
    activeSlide: 0,
  }

  cardCounterComponent = () => (
    <Text>{this.state.activeSlide + 1} / {this.props.deck.questions.length}</Text>
  )

  goToNextStep = () => {
    const { deck } = this.props;
    const { activeSlide } = this.state;
    const currentSelectedCard = activeSlide + 1;

    (currentSelectedCard < deck.questions.length)
      ? this.carouselInstance.snapToNext()
      : this.goToQuizResultAndAdjustStack();
  }
  goToQuizResultAndAdjustStack = () => {
    const { navigation } = this.props;
    const currentNavigationKey = navigation.state.key;

    const replaceAction = StackActions.replace({
      key: currentNavigationKey,
      action: NavigationActions.navigate({ routeName: 'QuizResult' }),
      routeName: 'QuizResult',
    });
    navigation.dispatch(replaceAction);
  }
  setCorrectAnswer = () => {
    this.goToNextStep();
  }
  setIncorrectAnswer = () => {
    this.goToNextStep();
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
        <TouchableOpacity onPress={() => this.setCorrectAnswer()}>
          <View style={styles.buttonCorrect}>
            <Text style={{ color: 'white' }}>Correct</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setIncorrectAnswer()}>
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

const mapStateToProps = ({ decks }: { decks: Deck[] }, ownProps: QuizProps) => {
  const { deckName } = ownProps.navigation.state.params;

  return {
    deck: decks[deckName],
  }
};

export default connect(
  mapStateToProps,
)(Quiz);
