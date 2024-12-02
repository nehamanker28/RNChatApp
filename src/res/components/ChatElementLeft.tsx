/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {R} from '../../constant';
import ContextMenu, {ContextMenuAction} from 'react-native-context-menu-view';
import {Container} from '../widgets/Container';
import {ImageView} from '../widgets/ImageView';
import {TextView} from '../widgets/TextView';
import {Message} from '../../models/message';
import {AudioAttachment} from './AudioAttachment';
import {Utils} from '../../commons/Utils';
import {Attachment} from '../../models/attachment';
import {VideoAttachment} from './VideoAttachment';

interface Props {
  message: Message;
  actions: Array<ContextMenuAction>;
  handleActions: any;
  audioPlayStopPress: any;
  audioSeekStart: any;
  audioSeekStop: any;
  audioIsPlaying?: boolean;
  audioProgress: number;
}

const defaultProps = {};

export function ChatElementLeft(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const attachments: any = [];

  for (let i = 0; i < attrs.message.attachments.length; i++) {
    const item = attrs.message.attachments[i] as Attachment;
    switch (item.mimetype) {
      case 'audio/mp3':
      case 'audio/m4a':
        attachments.push(
          <AudioAttachment
            message={attrs.message}
            attachment={attrs.message.getAttachment()!}
            audioPlayStopPress={attrs.audioPlayStopPress}
            audioSeekStart={attrs.audioSeekStart}
            audioSeekStop={attrs.audioSeekStop}
            audioIsPlaying={attrs.audioIsPlaying}
            audioProgress={attrs.audioProgress}
            audioRight={false}
          />,
        );
        break;
      case 'video/mp4':
        attachments.push(
          <VideoAttachment
            message={attrs.message}
            attachment={attrs.message.getAttachment()!}
            audioPlayStopPress={attrs.audioPlayStopPress}
            audioIsPlaying={attrs.audioIsPlaying}
            audioProgress={attrs.audioProgress}
            audioRight={false}
          />,
        );
        break;
    }
  }

  return (
    <>
      {Utils.isNotNullOrEmpty(attrs.message.message_text) && (
        <View
          style={{
            paddingBottom: 8,
            paddingTop: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginEnd: 80,
              marginStart: 16,
            }}>
            <Container height={42} width={42} marginEnd={8}>
              <ImageView src={R.drawable.chat_avatar_left} borderRadius={50} />
            </Container>
            <View style={{flexDirection: 'column'}}>
              <ContextMenu
                dropdownMenuMode={false}
                previewBackgroundColor={R.color.chat_left_color}
                actions={attrs.actions}
                onPress={e => {
                  attrs.handleActions(e.nativeEvent.index, attrs.message);
                }}>
                <View
                  style={{
                    backgroundColor: R.color.chat_left_color,
                    flexWrap: 'wrap',
                    paddingTop: 12,
                    paddingBottom: 12,
                    paddingEnd: 20,
                    paddingStart: 20,
                    borderRadius: 8,
                  }}>
                  <TextView
                    text={attrs.message.message_text}
                    textSize={16}
                    textColor={R.color.chat_left_text}
                  />
                </View>
              </ContextMenu>
              <View
                style={{
                  marginTop: 8,
                  flexDirection: 'row',
                }}>
                <TextView
                  text={attrs.message.getTimeStatus()}
                  textSize={10}
                  textColor={'grey'}
                />
              </View>
            </View>
          </View>
        </View>
      )}

      {attachments}
    </>
  );
}
