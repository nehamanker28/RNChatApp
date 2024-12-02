/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {ColorValue, View} from 'react-native';

interface Props {
  children: ReactNode;
  backgroundColor?: ColorValue;
  height?: any;
  width?: any;
  borderTopStartRadius?: number;
  borderTopEndRadius?: number;
  borderBottomStartRadius?: number;
  borderBottomEndRadius?: number;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingStart?: number;
  paddingEnd?: number;
  borderColor?: ColorValue;
  borderWidth?: number;
  elevation?: number;
  flex?: any;
  zIndex?: number;
  stack?: boolean;
}

const defaultProps = {
  backgroundColor: 'white',
  height: undefined,
  width: undefined,
  elevation: 0,
  flex: 'flex-start',
};

export function Container(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const position = attrs.stack ? 'absolute' : 'relative';
  return (
    <>
      <View
        style={{
          justifyContent: attrs.flex,
          alignItems: attrs.flex,
          backgroundColor: attrs.backgroundColor,
          height: attrs.height,
          width: attrs.width,
          borderTopStartRadius: attrs.borderTopStartRadius,
          borderTopEndRadius: attrs.borderTopEndRadius,
          borderBottomStartRadius: attrs.borderBottomStartRadius,
          borderBottomEndRadius: attrs.borderBottomEndRadius,
          borderColor: attrs.borderColor,
          borderWidth: attrs.borderWidth,
          marginTop: attrs.marginTop,
          marginBottom: attrs.marginBottom,
          marginStart: attrs.marginStart,
          marginEnd: attrs.marginEnd,
          paddingStart: attrs.paddingStart,
          paddingEnd: attrs.paddingEnd,
          paddingTop: attrs.paddingTop,
          paddingBottom: attrs.paddingBottom,
          shadowColor: 'black',
          shadowOffset: {width: 0, height: attrs.elevation},
          shadowOpacity: attrs.elevation > 0 ? 0.5 : 0.0,
          shadowRadius: attrs.elevation,
          zIndex: attrs.zIndex,
          position: position,
        }}>
        {attrs.children}
      </View>
    </>
  );
}
