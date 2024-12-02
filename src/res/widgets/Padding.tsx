import React, {ReactNode} from 'react';
import {View} from 'react-native';

interface Props {
  children: ReactNode;
  paddingTop?: number;
  paddingBottom?: number;
  paddingStart?: number;
  paddingEnd?: number;
}

const defaultProps = {};

export function Padding(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <>
      <View
        style={{
          paddingTop: attrs.paddingTop,
          paddingBottom: attrs.paddingBottom,
          paddingStart: attrs.paddingStart,
          paddingEnd: attrs.paddingEnd,
        }}>
        {attrs.children}
      </View>
    </>
  );
}
