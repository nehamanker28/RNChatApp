/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  children: ReactNode;
  borderRadius?: any;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingStart?: number;
  paddingEnd?: number;
  colors?: any;
  zIndex?: number;
}

const defaultProps = {
  borderRadius: 8,
  colors: ['#af70e3', '#ba73da', '#c276d3', '#ce7aca', '#d77dc4', '#dd7fbf'],
};

export function GradiantContainerSolid(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <View
      style={{
        borderRadius: attrs.borderRadius,
        marginTop: attrs.marginTop,
        marginBottom: attrs.marginBottom,
        marginStart: attrs.marginStart,
        marginEnd: attrs.marginEnd,
        zIndex: attrs.zIndex,
      }}>
      <LinearGradient
        colors={attrs.colors}
        style={{
          borderRadius: attrs.borderRadius,
        }}
        start={{y: 0.0, x: 1.0}}
        end={{y: 1.0, x: 1.0}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: attrs.paddingTop,
            paddingBottom: attrs.paddingBottom,
            paddingStart: attrs.paddingStart,
            paddingEnd: attrs.paddingEnd,
          }}>
          {attrs.children}
        </View>
      </LinearGradient>
    </View>
  );
}
