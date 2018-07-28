import React, { Component } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { addCardToDeck } from '../utils/api';

interface IAddQuestionProps {
  navigation: NavigationScreenProp<{}>;
}
interface IAddQuestionState {
  question: string;
  answer: string;
}

class AddQuestion extends Component<IAddQuestionProps, IAddQuestionState> {
  public state = {
    answer: '',
    question: '',
  };

  public render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView style={styles.detailView} behavior='padding' enabled>
        <TextInput
          style={styles.titleInputField}
          multiline={true}
          numberOfLines={3}
          editable={true}
          onBlur={Keyboard.dismiss}
          onChangeText={(question) => this.setState({ question })}
          placeholder='Question'
          value={this.state.question}
        />
        <TextInput
          style={styles.answerInputField}
          multiline={true}
          numberOfLines={3}
          editable={true}
          onBlur={Keyboard.dismiss}
          onChangeText={(answer) => this.setState({ answer })}
          placeholder='Answer'
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
    );
  }

  private handleSaveQuestion() {
    const { navigation } = this.props;
    const { deckName } = navigation.state.params;

    addCardToDeck(deckName, this.state)
      .then(() => {
        navigation.goBack();
      });
  }
}

const styles = StyleSheet.create({
  answerInputField: {
    borderWidth: 1,
    height: '10%',
    textAlign: 'center',
    width: '90%',
  },
  buttonOutlined: {
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: 200,
  },
  detailView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  picker: {
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '90%',
  },
  pickerItem: {
    height: 44,
  },
  titleInputField: {
    borderWidth: 1,
    height: '20%',
    textAlign: 'center',
    width: '90%',
  },
});

export default AddQuestion;
