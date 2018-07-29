import { Constants } from 'expo';
import React from 'react';
import { StatusBar, View } from 'react-native';

const CustomStatusBar: React.SFC<any> = ({backgroundColor, ...props}) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
  </View>
);

export default CustomStatusBar;
