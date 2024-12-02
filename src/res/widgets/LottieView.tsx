/* eslint-disable react/self-closing-comp */
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';

interface Props {
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  lottieRawRes?: any;
  width?: number;
}

const defaultProps = {
  gravity: 'start',
  width: 64,
};

export function LottieView(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <>
      <View
        style={{
          marginTop: attrs.marginTop,
          marginBottom: attrs.marginBottom,
          marginStart: attrs.marginStart,
          marginEnd: attrs.marginEnd,
        }}>
        <AnimatedLottieView
          source={attrs.lottieRawRes}
          autoPlay
          loop
          style={{width: attrs.width}}
        />
      </View>
    </>
  );
}
