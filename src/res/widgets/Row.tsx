/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {View} from 'react-native';

interface Props {
  children: ReactNode;
  gravity?: any;
}

const defaultProps = {};

export function Row(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  //const flexDirection = attrs.gravity === 'end' ? 'row-reverse' : 'row';
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: attrs.gravity,
        }}>
        {attrs.children}
      </View>
    </>
  );
}
