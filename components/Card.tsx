import React, { Component } from 'react';
import {
  Animated,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { IDeck } from '../utils/seed-data';

interface ICardProps {
  data: IDeck['questions'][0];
}
interface ICardState {
  animatedValue: Animated.Value;
  isCardFlipped: boolean;
}

class Card extends Component<ICardProps, ICardState> {
  private currentRotationValue: number;

  constructor(props: ICardProps) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
      isCardFlipped: false,
    };
    this.state.animatedValue.addListener(({ value }) => {
      this.currentRotationValue = value;

      if (
        (value < 90 && this.state.isCardFlipped) ||
        (value > 90 && !this.state.isCardFlipped)
      ) {
        this.toggleFlippedState();
      }
    });

    this.currentRotationValue = 0;
  }

  public render() {
    const { isCardFlipped } = this.state;

    return (
      <Animated.View style={[this.traslateYAnimatedStyles(), styles.card]}>
        {this.cardContentToBeRendered(isCardFlipped)}
      </Animated.View>
    );
  }

  private cardContentToBeRendered = (isCardFlipped: boolean) => {
    const { data } = this.props;

    if (isCardFlipped) {
      return (
        <View style={styles.backCard}>
          <Text>{data.answer}</Text>
          <Button
            onPress={this.flipCard}
            title='View Question'
            color={Platform.OS === 'ios' ? 'white' : 'transparent'}
          />
        </View>
      );
    }

    return (
      <View>
        <Text>{data.question}</Text>
        <Button
          onPress={this.flipCard}
          title='View Answer'
          color={Platform.OS === 'ios' ? 'white' : 'transparent'}
        />
      </View>
    );
  }

  private toggleFlippedState = () => {
    const { isCardFlipped } = this.state;

    this.setState({ isCardFlipped: !isCardFlipped });
  }

  private flipCard = () => {
    const { animatedValue } = this.state;

    if (this.currentRotationValue >= 90) {
      Animated.spring(animatedValue, {
        friction: 8,
        tension: 10,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        friction: 8,
        tension: 10,
        toValue: 180,
        useNativeDriver: true,
      }).start();
    }
  }

  private traslateYAnimatedStyles = () => {
    const { animatedValue } = this.state;
    const interpolation = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['360deg', '180deg'],
    });

    return {
      transform: [
        { rotateY: interpolation },
        { perspective: 1000 },
      ],
    };
  }
}

const styles = StyleSheet.create({
  backCard: {
    transform: [
      { rotateY: '180deg' },
    ],
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'green',
    borderWidth: 1,
    flex: 0.5,
    justifyContent: 'space-around',
    padding: 20,
  },
});

export default Card;
