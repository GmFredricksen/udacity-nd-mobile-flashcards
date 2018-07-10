import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
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

import { saveDeckTitle } from '../utils/api';

interface AddDeckProps {
  navigation: NavigationScreenProp<{}>,
  dispatch: Dispatch,
}
interface AddDeckState {
  titleText: string,
}

class AddDeck extends Component<AddDeckProps, AddDeckState> {
  state = {
    titleText: '',
  }

  handleSaveDeck(navigation: NavigationScreenProp<{}>) {
    saveDeckTitle(this.state.titleText)
      .then((data) => console.log(data));
    navigation.goBack();
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView style={styles.detailView} behavior="padding" enabled>
        <TextInput
          style={styles.titleInputField}
          onBlur={Keyboard.dismiss}
          onChangeText={(titleText) => this.setState({ titleText })}
          placeholder="New Deck Title"
          value={this.state.titleText}
        />
        <TouchableOpacity onPress={() => this.handleSaveDeck(navigation)}>
          <View style={styles.buttonOutlined}>
            <Text>Save Deck</Text>
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

export default AddDeck;
