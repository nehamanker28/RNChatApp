/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  children: ReactNode;
  stroke?: number;
  radius?: number;
  width?: any;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  colors?: any;
}

const defaultProps = {
  stroke: 1,
  radius: 16,
  width: '100%',
  colors: ['#854BF7', '#FF7497'],
};

export function GradiantContainer(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <>
      <View
        style={{
          paddingTop: attrs.marginTop,
          paddingBottom: attrs.marginBottom,
          paddingStart: attrs.marginStart,
          paddingEnd: attrs.marginEnd,
          width: attrs.width,
        }}>
        <LinearGradient
          colors={attrs.colors}
          start={{x: 0.0, y: 0.0}}
          end={{x: 0.0, y: 1.0}}
          style={{
            borderRadius: attrs.radius,
            padding: attrs.stroke,
            width: attrs.width,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: attrs.radius,
              width: attrs.width,
            }}>
            <View
              style={{
                borderRadius: attrs.radius,
                width: attrs.width,
              }}>
              {attrs.children}
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}
