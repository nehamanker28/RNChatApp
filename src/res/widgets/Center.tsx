/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {View} from 'react-native';

interface Props {
  children: ReactNode;
}

const defaultProps = {};

export function Center(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {attrs.children}
      </View>
    </>
  );
}
