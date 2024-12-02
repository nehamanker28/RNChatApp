import React, {ReactNode} from 'react';
import {View} from 'react-native';

interface Props {
  children: ReactNode;
  gravity?: string;
}

const defaultProps = {
  gravity: 'top',
};

export function Column(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const flexDirection =
    attrs.gravity === 'bottom' ? 'column-reverse' : 'column';
  return (
    <>
      <View style={{flexDirection: flexDirection}}>{attrs.children}</View>
    </>
  );
}
