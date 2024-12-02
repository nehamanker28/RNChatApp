import React, {Component} from 'react';
import {ColorValue, TouchableOpacity, View} from 'react-native';
import {Container} from '../widgets/Container';
import {ImageView} from '../widgets/ImageView';
import {R} from '../../constant';
import {Utils} from '../../commons/Utils';
import {Message} from '../../models/message';
import {Thread} from '../../models/thread';
import {BaseComponent} from '../../commons/BaseComponent';
import {ChatScreenComponent} from '../../screens/ChatScreen';
import {Repository} from '../../commons/Repository';

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
  textBtnPressed: any;
  audioBtnPressed: any;
  videoBtnPressed: any;
}

const defaultProps = {
  size: 24,
  backgroundColor: R.color.colorAccent,
  borderRadius: 4,
  height: 40,
  width: 35,
  elevation: 2,
  enabled: true,
};

export function CustomizedSendButton(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <View style={{flex: 1, flexDirection: 'row', marginStart: 5}}>
      <TouchableOpacity
        onPress={() => {
          attrs.textBtnPressed('text');
        }}
        activeOpacity={1}>
        <Container
          flex="center"
          height={attrs.height}
          width={attrs.width}
          //borderBottomEndRadius={attrs.borderRadius}
          borderBottomStartRadius={attrs.borderRadius}
          //   borderTopEndRadius={attrs.borderRadius}
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

      <TouchableOpacity
        onPress={() => {
          attrs.audioBtnPressed('hello : audio');
        }}
        activeOpacity={1}>
        <Container
          flex="center"
          height={attrs.height}
          width={attrs.width}
          borderColor={attrs.borderColor}
          borderWidth={attrs.borderWidth}
          elevation={attrs.elevation}
          marginTop={attrs.marginTop}
          marginBottom={attrs.marginBottom}
          marginStart={attrs.marginStart}
          marginEnd={attrs.marginEnd}
          backgroundColor={attrs.backgroundColor}>
          <ImageView
            src={R.drawable.ic_sendAudio}
            height={attrs.size}
            width={attrs.size}
          />
        </Container>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          attrs.videoBtnPressed('hello : video');
        }}
        activeOpacity={0.8}>
        <Container
          flex="center"
          height={attrs.height}
          width={attrs.width}
          borderBottomEndRadius={attrs.borderRadius}
          borderTopEndRadius={attrs.borderRadius}
          borderColor={attrs.borderColor}
          borderWidth={attrs.borderWidth}
          elevation={attrs.elevation}
          marginTop={attrs.marginTop}
          marginBottom={attrs.marginBottom}
          marginStart={attrs.marginStart}
          marginEnd={attrs.marginEnd}
          backgroundColor={attrs.backgroundColor}>
          <ImageView
            src={R.drawable.ic_video_attachment}
            height={attrs.size}
            width={attrs.size}
          />
        </Container>
      </TouchableOpacity>
    </View>
  );
}
