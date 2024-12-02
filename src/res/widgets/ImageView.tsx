/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {SvgXml} from 'react-native-svg';

interface Props {
  src: any;
  height?: any;
  width?: any;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  borderRadius?: number;
  resizeMode?: any;
  visibility?: boolean;
}

const defaultProps = {
  height: '100%',
  width: '100%',
  marginTop: 0,
  marginBottom: 0,
  marginStart: 0,
  marginEnd: 0,
  resizeMode: 'contain',
  visibility: true,
};

export function ImageView(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  if (typeof attrs.src === 'string') {
    return (
      <Image
        source={{uri: `data:image/png;base64,${attrs.src}`}}
        resizeMode={attrs.resizeMode}
        style={{
          height: attrs.height,
          width: attrs.width,
          marginTop: attrs.marginTop,
          marginBottom: attrs.marginBottom,
          marginStart: attrs.marginStart,
          marginEnd: attrs.marginEnd,
          borderRadius: attrs.borderRadius,
        }}
      />
    );
  } else {
    const svg = attrs.src !== undefined && attrs.src.name.endsWith('.svg');
    return (
      <>
        {attrs.visibility &&
          (svg ? (
            <SvgXml
              xml={attrs.src.src}
              width={attrs.width}
              height={attrs.height}
              style={{
                marginTop: attrs.marginTop,
                marginBottom: attrs.marginBottom,
                marginStart: attrs.marginStart,
                marginEnd: attrs.marginEnd,
                borderRadius: attrs.borderRadius,
              }}
            />
          ) : (
            <Image
              source={attrs.src.src}
              resizeMode={attrs.resizeMode}
              style={{
                height: attrs.height,
                width: attrs.width,
                marginTop: attrs.marginTop,
                marginBottom: attrs.marginBottom,
                marginStart: attrs.marginStart,
                marginEnd: attrs.marginEnd,
                borderRadius: attrs.borderRadius,
              }}
            />
          ))}
      </>
    );
  }
}
