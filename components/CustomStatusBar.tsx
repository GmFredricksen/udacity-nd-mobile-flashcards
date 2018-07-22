import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar } from 'react-native';

const CustomStatusBar: React.SFC<any> = ({backgroundColor, ...props}) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

export default CustomStatusBar;
