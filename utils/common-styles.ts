import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  buttonBase: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginBottom: 5,
    width: 200,
  },
  buttonOutlined: {
    alignItems: 'center',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    marginBottom: 5,
    width: 200,
  },
  inputField: {
    borderWidth: 1,
    textAlign: 'center',
    width: '90%',
  },
  mainView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
  viewHeading: {
    fontSize: 35,
    fontWeight: 'bold',
  },
});
