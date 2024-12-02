import React, {ReactNode} from 'react';
import {View,Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    marginLeft : number,
}

const defaultProps = {
  width: Dimensions.get("screen").width/2,
};

export function Indicator(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
 
  return (
    <>
    <View>
    <LinearGradient
      colors={['#7A47FF', '#A555DE', '#DB68B3', '#FF7497']}
      style={{
        height: 4,
        marginTop: 52,
        width: attrs.width,
        marginLeft: attrs.marginLeft,
      }}
      start={{ y: 0.0, x: 0.0 }}
      end={{ y: 1.0, x: 1.0 }}>

    </LinearGradient>
    </View>
    </>
  );
}