import React from 'react';
import {ColorValue, TouchableOpacity} from 'react-native';
import {Container} from './Container';
import {ImageView} from './ImageView';
import {R} from '../../constant';

interface Props {
  onClick?: any;
  marginTop?: number;
  marginBottom?: number;
  marginStart?: number;
  marginEnd?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingStart?: number;
  paddingEnd?: number;
  backgroundColor?: ColorValue;
  src?: any;
  height?: number;
  width?: number;
  elevation?: number;
  borderColor?: ColorValue;
  borderRadius?: number;
  borderWidth?: number;
  size?: number;
  enabled?: boolean;
}

const defaultProps = {
  size: 24,
  backgroundColor: R.color.colorAccent,
  borderRadius: 4,
  height: 42,
  width: 42,
  elevation: 2,
  enabled: true,
};

export function ImageButton(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <TouchableOpacity
      onPress={attrs.enabled ? attrs.onClick : undefined}
      activeOpacity={0.8}>
      <Container
        flex="center"
        height={attrs.height}
        width={attrs.width}
        borderBottomEndRadius={attrs.borderRadius}
        borderBottomStartRadius={attrs.borderRadius}
        borderTopEndRadius={attrs.borderRadius}
        borderTopStartRadius={attrs.borderRadius}
        borderColor={attrs.borderColor}
        borderWidth={attrs.borderWidth}
        elevation={attrs.elevation}
        marginTop={attrs.marginTop}
        marginBottom={attrs.marginBottom}
        marginStart={attrs.marginStart}
        marginEnd={attrs.marginEnd}
        backgroundColor={attrs.backgroundColor}>
        <ImageView src={attrs.src} height={attrs.size} width={attrs.size} />
      </Container>
    </TouchableOpacity>
  );
}
