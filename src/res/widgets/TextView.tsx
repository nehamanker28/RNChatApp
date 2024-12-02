/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ColorValue, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  text?: string;
  textColor?: ColorValue;
  textStyle?: any;
  gravity?: any;
  textSize?: any;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  onClick?: any;
  singleLine?: boolean;
  fontFamily?: string;
  visibility?: boolean;
}

const defaultProps = {
  textSize: 16,
  textStyle: 'normal',
  marginTop: 0,
  marginBottom: 0,
  marginStart: 0,
  marginEnd: 0,
  singleLine: false,
  visibility: true,
  textColor: 'black',
};

export function TextView(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  let fontFamily =
    attrs.fontFamily === undefined
      ? attrs.textStyle === 'bold'
        ? 'Inter-Bold'
        : 'Inter-Regular'
      : attrs.fontFamily;

  return (
    <>
      {attrs.visibility && (
        <View
          style={{
            flexShrink: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {attrs.onClick === undefined ? (
            <Text
              numberOfLines={attrs.singleLine ? 1 : 0}
              style={{
                flexShrink: 1,
                textAlign: attrs.gravity,
                fontSize: attrs.textSize,
                color: attrs.textColor,
                marginTop: attrs.marginTop,
                marginBottom: attrs.marginBottom,
                marginStart: attrs.marginStart,
                marginEnd: attrs.marginEnd,
                fontFamily: fontFamily,
              }}>
              {attrs.text}
            </Text>
          ) : (
            <TouchableOpacity activeOpacity={1} onPress={attrs.onClick}>
              <Text
                numberOfLines={attrs.singleLine ? 1 : 0}
                style={{
                  flexShrink: 1,
                  textAlign: attrs.gravity,
                  fontSize: attrs.textSize,
                  color: attrs.textColor,
                  marginTop: attrs.marginTop,
                  marginBottom: attrs.marginBottom,
                  marginStart: attrs.marginStart,
                  marginEnd: attrs.marginEnd,
                  fontFamily: fontFamily,
                }}>
                {attrs.text}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
}
