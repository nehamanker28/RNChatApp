/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {R} from '../../constant';
import {EditText} from './EditText';
import {ImageButton} from './ImageButton';
import {ColorValue, View} from 'react-native';
import {Slider} from '../../customs/slider';
import {Utils} from '../../commons/Utils';
import {CustomizedSendButton} from '../components/CustomizedSendButton';

interface Props {
  paddingTop?: number;
  paddingBottom?: number;
  paddingStart?: number;
  paddingEnd?: number;
  recordTime: number;
  backgroundColor?: ColorValue;
  enabledAudioRecording: boolean;
  text?: string;
  onTextChanged?: any;
  onSend?: any;
  onStartRecording?: any;
  onStopRecording?: any;
  onCancelRecording?: any;
  attachmentActive: boolean;
  onAttachmentClick: any;
  textBtnPressed: any;
  audioBtnPressed: any;
  videoBtnPressed: any;
}

const defaultProps = {
  backgroundColor: 'white',
  attachmentActive: false,
};

export function ChatInput(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};

  return (
    <>
      <View style={{flexDirection: 'column', backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: attrs.paddingTop,
            paddingStart: attrs.paddingStart,
            backgroundColor: attrs.backgroundColor,
            paddingBottom: attrs.paddingBottom,
            justifyContent: 'space-around',
            //alignItems: 'center',
          }}>
          <ImageButton
            src={
              attrs.attachmentActive
                ? R.drawable.ic_attachment_active
                : R.drawable.ic_attachment_inactive
            }
            marginEnd={8}
            marginStart={-10}
            backgroundColor={
              attrs.attachmentActive ? R.color.colorAccent : 'white'
            }
            size={20}
            elevation={attrs.attachmentActive ? 1 : 0}
            onClick={() => {
              attrs.onAttachmentClick();
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              width: '60%',
            }}>
            <Slider
              isOpacityChangeOnSlide={true}
              text={Utils.secondsToDuration(attrs.recordTime)}
              disableSliding={!attrs.enabledAudioRecording}
              onEndReached={() => {
                if (attrs.enabledAudioRecording) {
                  console.debug('cancel');
                  Utils.vibrate(100);
                  attrs.onCancelRecording();
                }
              }}
              onStart={() => {
                if (attrs.enabledAudioRecording) {
                  console.debug('start');
                  Utils.vibrate(50);
                  attrs.onStartRecording();
                }
              }}
              onStop={() => {
                if (attrs.enabledAudioRecording) {
                  console.debug('stop');
                  attrs.onStopRecording();
                }
              }}
            />
            <EditText
              stroke={0}
              text={attrs.text}
              multiline={true}
              marginEnd={48}
              backgroundColor={R.color.chatInputBackgroud}
              borderRadius={8}
              hint={R.string.chatAskHint}
              onTextChanged={attrs.onTextChanged}
            />
          </View>

          <CustomizedSendButton
            src={R.drawable.ic_send}
            elevation={1}
            textBtnPressed={attrs.textBtnPressed}
            audioBtnPressed={attrs.audioBtnPressed}
            videoBtnPressed={attrs.videoBtnPressed}
          />
        </View>
      </View>
    </>
  );
}
