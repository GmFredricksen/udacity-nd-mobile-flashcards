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
import { commonStyles } from '../utils/common-styles';
import { isFormValid } from '../utils/helpers';

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
    const { answer, question } = this.state;

    return (
      <KeyboardAvoidingView style={commonStyles.mainView} behavior='padding' enabled>
        <View>
          <Text style={commonStyles.viewHeading}>New Question</Text>
        </View>
        <TextInput
          style={[styles.titleInputField, commonStyles.inputField]}
          multiline={true}
          numberOfLines={3}
          editable={true}
          onBlur={Keyboard.dismiss}
          onChangeText={(questionValue) => this.setState({ question: questionValue })}
          placeholder='Question'
          value={question}
        />
        <TextInput
          style={[styles.answerInputField, commonStyles.inputField]}
          multiline={true}
          numberOfLines={3}
          editable={true}
          onBlur={Keyboard.dismiss}
          onChangeText={(answerValue) => this.setState({ answer: answerValue })}
          placeholder='Answer'
          value={answer}
        />
        <View>
          <TouchableOpacity
            disabled={!isFormValid([answer, question])}
            onPress={() => this.handleSaveQuestion()}
          >
            <View style={commonStyles.buttonOutlined}>
              <Text>Save Card</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={commonStyles.buttonOutlined}>
              <Text>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    height: '20%',
  },
  titleInputField: {
    height: '20%',
  },
});

export default AddQuestion;
