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
import { commonStyles } from '../utils/common-styles';
import { isFormValid, obj2Arr } from '../utils/helpers';
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
    const { titleText } = this.state;

    return (
      <KeyboardAvoidingView style={commonStyles.mainView} behavior='padding' enabled={true}>
        <View>
          <Text style={commonStyles.viewHeading}>New Deck</Text>
        </View>
        <TextInput
          style={[styles.titleInputField, commonStyles.inputField]}
          onBlur={Keyboard.dismiss}
          onChangeText={(titleValue) => this.setState({ titleText: titleValue })}
          placeholder='New Deck Title'
          value={titleText}
        />
        <View>
          <TouchableOpacity
            disabled={!isFormValid([titleText])}
            onPress={() => this.handleSaveDeck(navigation)}
          >
            <View style={commonStyles.buttonOutlined}>
              <Text>Save Deck</Text>
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

  private handleSaveDeck(navigation: NavigationScreenProp<{}>) {
    const { dispatch } = this.props;

    saveDeckTitle(this.state.titleText)
      .then((decks) => dispatch(setDecks(decks)));
    navigation.goBack();
  }
}

const styles = StyleSheet.create({
  titleInputField: {
    height: '10%',
  },
});

const mapStateToProps = ({ decks }: { decks: IDeck }) => ({
  decks: obj2Arr(decks),
});

export default connect(
  mapStateToProps,
)(AddDeck);
