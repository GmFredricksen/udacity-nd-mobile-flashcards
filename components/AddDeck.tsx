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
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setDecks } from '../actions';
import { saveDeckTitle } from '../utils/api';
import { obj2Arr } from '../utils/helpers';
import { IDeck } from '../utils/seed-data';

interface IAddDeckProps {
  navigation: NavigationScreenProp<{}>;
  dispatch: Dispatch;
}
interface IAddDeckState {
  titleText: string;
}

class AddDeck extends Component<IAddDeckProps, IAddDeckState> {
  public state = {
    titleText: '',
  };

  public render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView style={styles.detailView} behavior='padding' enabled={true}>
        <TextInput
          style={styles.titleInputField}
          onBlur={Keyboard.dismiss}
          onChangeText={(titleText) => this.setState({ titleText })}
          placeholder='New Deck Title'
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
    );
  }

  private handleSaveDeck(navigation: NavigationScreenProp<{}>) {
    const { dispatch } = this.props;

    saveDeckTitle(this.state.titleText)
      .then((decks) => dispatch(setDecks(decks)));
    navigation.goBack();
  }
}

const styles = StyleSheet.create({
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
  titleInputField: {
    borderWidth: 1,
    height: 40,
    textAlign: 'center',
    width: 200,
  },
});

const mapStateToProps = ({ decks }: { decks: IDeck }) => ({
  decks: obj2Arr(decks),
});

export default connect(
  mapStateToProps,
)(AddDeck);
