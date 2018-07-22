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
  Picker,
} from 'react-native';

import { addCardToDeck } from '../utils/api';

interface AddQuestionProps {
  navigation: NavigationScreenProp<{}>,
}
interface AddQuestionState {
  question: string,
  answer: string,
  result: boolean,
}

class AddQuestion extends Component<AddQuestionProps, AddQuestionState> {
  state = {
    question: '',
    answer: '',
    result: true,
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
          multiline={true}
          numberOfLines={3}
          editable={true}
          onBlur={Keyboard.dismiss}
          onChangeText={(question) => this.setState({ question })}
          placeholder="Question"
          value={this.state.question}
        />
        <TextInput
          style={styles.answerInputField}
          multiline={true}
          numberOfLines={3}
          editable={true}
          onBlur={Keyboard.dismiss}
          onChangeText={(answer) => this.setState({ answer })}
          placeholder="Answer"
          value={this.state.answer}
        />
        <View style={styles.pickerContainer}>
          <Text>Result</Text>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.result}
            onValueChange={(itemValue, itemIndex) => this.setState({ result: itemValue })}
          >
            <Picker.Item label="Correct" value={true} />
            <Picker.Item label="Incorrect" value={false} />
          </Picker>
        </View>
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
    width: '90%',
    height: '20%',
    borderWidth: 1,
    textAlign: 'center',
  },
  answerInputField: {
    width: '90%',
    height: '10%',
    borderWidth: 1,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '90%',
  },
  picker: {
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
  },
  pickerItem: {
    height: 44,
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
