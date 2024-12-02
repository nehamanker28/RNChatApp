import React from 'react';
import {ColorValue, View} from 'react-native';
import {R} from '../../constant';

interface Props {
  height?: any;
  width?: any;
  backgroundColor?: ColorValue;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  visibility?: boolean;
}

const defaultProps = {
  backgroundColor: R.color.dividerColor,
  marginTop: 0,
  marginBottom: 0,
  marginStart: 0,
  marginEnd: 0,
  visibility: true,
};

export function Divider(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <>
     {attrs.visibility && (
      <View
        style={{
          height: attrs.height,
          width: attrs.width,
          backgroundColor: attrs.backgroundColor,
          marginTop: attrs.marginTop,
          marginBottom: attrs.marginBottom,
          marginStart: attrs.marginStart,
          marginEnd: attrs.marginEnd,
        }}
      />
     )}
    </>
  );
}
