import React, { Component } from 'react';
// import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  NavigationActions,
  NavigationScreenProp,
  NavigationParams,
  StackActions,
} from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Card from './Card';
import { Deck } from '../utils/seed-data';

interface QuizProps {
  deck: Deck,
  // dispatch: Dispatch,
  navigation: NavigationScreenProp<NavigationParams>,
}

class Quiz extends Component<QuizProps> {
  carouselInstance: Carousel;

  state = {
    activeSlide: 0,
  }

  componentDidMount() {

  }

  get pagination() {
    const { activeSlide } = this.state;
    const { deck } = this.props;

    return (
      <Pagination
        dotsLength={deck.questions.length}
        activeDotIndex={activeSlide}
        // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
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
        {/* {this.pagination} */}
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
