import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, Button } from 'react-native';

import { Deck } from '../utils/seed-data';

interface CardProps {
  data: Deck,
}
interface CardState {
  animatedValue: Animated.Value,
  isCardFlipped: boolean,
}

class Card extends Component<CardProps, CardState> {
  currentRotationValue: Number;

  constructor(props: CardProps) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
      isCardFlipped: false,
    }
    this.state.animatedValue.addListener(({ value }) => {
      this.currentRotationValue = value;

      if (
        (value < 90 && this.state.isCardFlipped) ||
        (value > 90 && !this.state.isCardFlipped)
      ) {
        this.toggleFlippedState();
      }
    })

    this.currentRotationValue = 0;
  }

  toggleFlippedState = () => {
    const { isCardFlipped } = this.state;

    this.setState({ isCardFlipped: !isCardFlipped });
  }

  flipCard = () => {
    const { animatedValue } = this.state;

    if (this.currentRotationValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }

  traslateYAnimatedStyles = () => {
    const { animatedValue } = this.state;
    const interpolation = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['360deg', '180deg'],
    })

    return {
      transform: [
        { rotateY: interpolation },
        { perspective: 1000 },
      ]
    }
  }

  render() {
    const { data } = this.props;
    const { isCardFlipped } = this.state;

    return (
      <Animated.View style={[this.traslateYAnimatedStyles(), styles.card]}>
        {isCardFlipped
          ? <View style={styles.backCard}>
              <Text>{data.answer}</Text>
              <Button
                onPress={this.flipCard}
                title="View Question"
                color="white"
              />
            </View>
          : <View>
              <Text>{data.question}</Text>
              <Button
                onPress={this.flipCard}
                title="View Answer"
                color="white"
              />
            </View>
        }
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    backgroundColor: 'green',
  },
  backCard: {
    transform: [
      { rotateY: '180deg' },
    ],
  },
});

export default Card;
