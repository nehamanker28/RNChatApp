/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {R} from '../../constant';
import ContextMenu, {ContextMenuAction} from 'react-native-context-menu-view';
import {Container} from '../widgets/Container';
import {ImageView} from '../widgets/ImageView';
import {TextView} from '../widgets/TextView';
import {Message, MessageStatus} from '../../models/message';
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
  avatar?: string;
}

const defaultProps = {};

export function ChatElementRight(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const attachments: any = [];

  for (let i = 0; i < attrs.message.attachments.length; i++) {
    const item = attrs.message.attachments[i] as Attachment;
    console.debug(item.mimetype);
    switch (item.mimetype) {
      case 'audio/mp3':
      case 'audio/m4a':
        attachments.push(
          <AudioAttachment
            message={attrs.message}
            avatar={attrs.avatar}
            attachment={item}
            audioPlayStopPress={attrs.audioPlayStopPress}
            audioSeekStart={attrs.audioSeekStart}
            audioSeekStop={attrs.audioSeekStop}
            audioIsPlaying={attrs.audioIsPlaying}
            audioProgress={attrs.audioProgress}
            audioRight={true}
          />,
        );
        break;
      case 'video/mp4':
        attachments.push(
          <VideoAttachment
            message={attrs.message}
            attachment={item}
            audioPlayStopPress={attrs.audioPlayStopPress}
            audioIsPlaying={attrs.audioIsPlaying}
            audioProgress={attrs.audioProgress}
            audioRight={true}
          />,
        );
        break;
    }
  }

  return (
    <>
      {attachments}
      {Utils.isNotNullOrEmpty(attrs.message.message_text) && (
        <View
          style={{
            paddingBottom: 8,
            paddingTop: 8,
          }}>
          <View
            style={{
              flexDirection: 'row-reverse',
              marginEnd: 80,
              marginStart: 16,
            }}>
            <Container marginStart={8}>
              <ImageView
                src={
                  attrs.avatar === undefined
                    ? R.drawable.placeholder_avatar
                    : attrs.avatar
                }
                height={42}
                width={42}
                resizeMode={'cover'}
                borderRadius={80}
              />
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
                    backgroundColor: R.color.chat_right_color,
                    flexWrap: 'wrap',
                    paddingTop: 12,
                    paddingBottom: 12,
                    paddingEnd: 20,
                    paddingStart: 20,
                    borderRadius: 8,
                  }}>
                  <TextView
                    text={Utils.getTrimmedString(attrs.message.message_text!)}
                    textSize={16}
                    textColor={R.color.chat_right_text}
                  />
                </View>
              </ContextMenu>
              <View
                style={{
                  marginTop: 8,
                  flexDirection: 'row-reverse',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}>
                <TextView
                  text={attrs.message.getTimeStatus()}
                  textSize={10}
                  textColor={'grey'}
                />

                {(() => {
                  const statusImage = getStatusImage(attrs.message);
                  if (statusImage !== null) {
                    return (
                      <ImageView
                        marginEnd={4}
                        src={statusImage}
                        height={14}
                        width={14}
                      />
                    );
                  }
                  return (
                    <ImageView
                      marginEnd={4}
                      src={R.drawable.ic_message_pending}
                      height={10}
                      width={10}
                    />
                  );
                })()}
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );

  function getStatusImage(message: Message): any {
    switch (message.status) {
      case MessageStatus.created:
        return R.drawable.ic_message_created;
      case MessageStatus.delivered:
        return R.drawable.ic_message_delivered;
      case MessageStatus.acknowledged:
        return R.drawable.ic_message_acknowledged;
      default:
        return null;
    }
  }
}
