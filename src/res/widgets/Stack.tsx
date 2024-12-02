/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {View} from 'react-native';

interface Props {
  children: ReactNode;
}

const defaultProps = {};

// const mapped = Children.map(children, (child, index) => {
//   if(React.isValidElement(child)) {
//     return React.cloneElement(child, {
//       ...child.props,
//       isFirst: index === 0,
//       isLast: !Array.isArray(children) || index === children.length - 1,
//     })
//   }
//   return null
// })

export function Stack(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {attrs.children}
      </View>
    </>
  );
}
