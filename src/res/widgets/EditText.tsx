/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ColorValue,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {R} from '../../constant';
import {Utils} from '../../commons/Utils';
import {TextView} from './TextView';
import {ImageView} from './ImageView';

interface Props {
  text?: string;
  textColor?: ColorValue;
  gravity?: any;
  textSize?: number;
  hint?: string;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingStart?: number;
  paddingEnd?: number;
  backgroundColor?: ColorValue;
  borderRadius?: number;
  borderColor?: ColorValue;
  borderTopColor?: ColorValue;
  borderBottomColor?: ColorValue;
  borderStartColor?: ColorValue;
  borderEndColor?: ColorValue;
  stroke?: number;
  width?: any;
  height?: any;
  elevation?: number;
  onTextChanged?: any;
  inputType?: string;
  error?: string;
  drawableLeft?: any;
  drawableLeftMargin?: any;
  drawableLeftSecondary?: any;
  drawableLeftClick?: any;
  drawableRight?: any;
  drawableRightClick?: any;
  drawableRightSize?: number;
  keyboardType?: any;
  enabled?: boolean;
  multiline?: boolean;
}

const defaultProps = {
  textSize: 14,
  marginTop: 0,
  marginBottom: 0,
  marginStart: 0,
  marginEnd: 0,
  paddingStart: 12,
  paddingEnd: 12,
  paddingTop: 8,
  paddingBottom: 8,
  borderRadius: 8,
  borderColor: R.color.colorAccent,
  drawableLeftMargin: 8,
  drawableRightSize: 12,
  stroke: 1,
  elevation: 0,
  inputType: 'text',
  error: '',
  enabled: true,
  multiline: false,
};

export function EditText(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const secureTextEntry = attrs.inputType === 'textPassword';
  const borderTopColor =
    attrs.borderTopColor === undefined
      ? attrs.borderColor
      : attrs.borderTopColor;
  const borderBottomColor =
    attrs.borderBottomColor === undefined
      ? attrs.borderColor
      : attrs.borderBottomColor;
  const borderStartColor =
    attrs.borderStartColor === undefined
      ? attrs.borderColor
      : attrs.borderStartColor;
  const borderEndColor =
    attrs.borderEndColor === undefined
      ? attrs.borderColor
      : attrs.borderEndColor;
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: attrs.backgroundColor,
          marginTop: attrs.marginTop,
          marginBottom: attrs.marginBottom,
          marginStart: attrs.marginStart,
          marginEnd: attrs.marginEnd,
          borderTopColor: borderTopColor,
          borderBottomColor: borderBottomColor,
          borderStartColor: borderStartColor,
          borderEndColor: borderEndColor,
          borderWidth: attrs.stroke,
          borderRadius: attrs.borderRadius,
          alignItems: 'center',
        }}>
        {attrs.drawableLeft && (
          <TouchableOpacity onPress={attrs.drawableLeftClick} activeOpacity={1}>
            <View
              style={{
                borderRadius: attrs.borderRadius,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ImageView
                src={attrs.drawableLeft}
                height={24}
                width={24}
                marginStart={attrs.drawableLeftMargin}
              />
              {attrs.drawableLeftSecondary && (
                <ImageView
                  src={attrs.drawableLeftSecondary}
                  height={12}
                  width={12}
                  marginStart={8}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
        <TextInput
          pointerEvents={attrs.enabled ? 'auto' : 'none'}
          autoCapitalize="none"
          placeholder={attrs.hint}
          value={attrs.text}
          onChangeText={attrs.onTextChanged}
          placeholderTextColor={R.color.hintColor}
          secureTextEntry={secureTextEntry}
          keyboardType={attrs.keyboardType}
          returnKeyType="done"
          multiline={attrs.multiline}
          style={{
            paddingStart: attrs.paddingStart,
            paddingEnd: attrs.paddingEnd,
            paddingTop: attrs.paddingTop,
            paddingBottom: attrs.paddingBottom,
            fontSize: attrs.textSize,
            width: attrs.width,
            height: attrs.height,
            color: 'black',
            flexGrow: 1,
            // elevation
            shadowColor: 'black',
            shadowOffset: {width: 0, height: attrs.elevation},
            shadowOpacity: attrs.elevation > 0 ? 0.5 : 0.0,
            shadowRadius: attrs.elevation,
          }}
        />
        {attrs.drawableRight && (
          <TouchableOpacity
            onPress={attrs.drawableRightClick}
            activeOpacity={1}>
            <View
              style={{
                height: attrs.height,
                borderRadius: attrs.borderRadius,
              }}>
              <ImageView
                src={attrs.drawableRight}
                height={attrs.drawableRightSize}
                width={attrs.drawableRightSize}
                marginEnd={8}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <TextView
        text={attrs.error}
        marginTop={4}
        textSize={12}
        visibility={Utils.isNotNullOrEmpty(attrs.error)}
        textColor={R.color.error_text}
      />
    </>
  );
}
