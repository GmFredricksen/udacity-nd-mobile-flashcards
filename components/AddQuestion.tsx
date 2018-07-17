import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import { addCardToDeck } from '../utils/api';

interface AddQuestionProps {
  navigation: NavigationScreenProp<{}>,
}
interface AddQuestionState {
  question: string,
  answer: string,
}

class AddQuestion extends Component<AddQuestionProps, AddQuestionState> {
  state = {
    question: '',
    answer: '',
  }

  handleSaveQuestion() {
    const { navigation } = this.props;
    const { deckName } = navigation.state.params;

    addCardToDeck(deckName, this.state)
      .then(() => {
        navigation.goBack();
      });
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView style={styles.detailView} behavior="padding" enabled>
        <TextInput
          style={styles.titleInputField}
          onBlur={Keyboard.dismiss}
          onChangeText={(question) => this.setState({ question })}
          placeholder="Question"
          value={this.state.question}
        />
        <TextInput
          style={styles.titleInputField}
          onBlur={Keyboard.dismiss}
          onChangeText={(answer) => this.setState({ answer })}
          placeholder="Answer"
          value={this.state.answer}
        />
        <TouchableOpacity onPress={() => this.handleSaveQuestion()}>
          <View style={styles.buttonOutlined}>
            <Text>Save Card</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.buttonOutlined}>
            <Text>Cancel</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
};

const styles = StyleSheet.create({
  detailView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20
  },
  titleInputField: {
    width: 200,
    height: 40,
    borderWidth: 1,
    textAlign: 'center',
  },
  buttonOutlined: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});

export default AddQuestion;
