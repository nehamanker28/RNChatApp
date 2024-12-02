/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ColorValue, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TextView} from './TextView';

interface Props {
  text?: string;
  borderRadius?: any;
  fontSize?: any;
  onClick: any;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingStart?: number;
  paddingEnd?: number;
  colors?: any;
  textStyle?: any;
  textColor?: ColorValue;
  alpha?: number;
  height?:number;
}

const defaultProps = {
  text: 'Button',
  borderRadius: 8,
  fontSize: 16,
  colors: ['#854BF7', '#FF7497'],
  textStyle: 'normal',
  textColor: 'white',
  alpha: 1.0,
};

export function GradiantButton(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <View
      style={{
        borderRadius: attrs.borderRadius,
        marginTop: attrs.marginTop,
        marginBottom: attrs.marginBottom,
        marginStart: attrs.marginStart,
        marginEnd: attrs.marginEnd,
      }}>
      <TouchableOpacity
        onPress={attrs.onClick}
        activeOpacity={0.8}
        style={{opacity: attrs.alpha}}>
        <LinearGradient
          colors={attrs.colors}
          style={{
            borderRadius: attrs.borderRadius,
          }}
          start={{y: 0.0, x: 0.0}}
          end={{y: 0.0, x: 1.0}}>
          <View
            style={{
              height:attrs.height,
              minHeight: 32,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: attrs.paddingTop,
              paddingBottom: attrs.paddingBottom,
              paddingStart: attrs.paddingStart,
              paddingEnd: attrs.paddingEnd,
            }}>
            <TextView
              text={attrs.text}
              textStyle={attrs.textStyle}
              textColor={attrs.textColor}
              textSize={12}
              marginStart={16}
              marginEnd={16}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
