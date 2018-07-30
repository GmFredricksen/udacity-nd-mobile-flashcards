# 📱📜 Mobile Flashcards

Final assessment project for Udacity's *React Native* course.

## 📓 Notes

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app)
using [react-native-scripts-ts](https://github.com/mathieudutour/create-react-native-app-typescript) as `--scripts-version` for compilation since I wanted to bring [TypeScript](https://www.typescriptlang.org) into the game.

The project requirements can be found [here](https://review.udacity.com/#!/rubrics/1021/view).

The most recent guide about performing common tasks can be found [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## 📦 External Libraries

* [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel): used for handling rendering and scrolling of Cards in a Quiz

## Target Platforms

As of today the app has been tested and run successfully on the following platforms:

* *`iOS`* - Device/Simulator
* *`Android`* - Device

Should you encounter any error/bug please make sure to submit an issue to this repository.

## TODOs

* Write tests
* Styling is basically missing: I've just used very basic set of rules to have the app usable
* Add functionality to edit/delete Decks and Cards
* Add functionality to keep a history of played Quizzes
* Add a second Tab where to list all played Quizzes
  * PlayedQuizDetail view: to access infos/stats about past played Quizzes
  * Dedicated StackNavigator to access the detail views
