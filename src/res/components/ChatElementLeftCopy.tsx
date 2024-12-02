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

interface Props {
  message: Message;
  actions: Array<ContextMenuAction>;
  handleActions: any;
  audioPlayStopPress: any;
  audioIsPlaying?: boolean;
  audioProgress: number;
}

const defaultProps = {};

export function ChatElementLeftCopy(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <>
      {attrs.message.getAttachment() !== null ? (
        <AudioAttachment
          message={attrs.message}
          attachment={attrs.message.getAttachment()!}
          audioPlayStopPress={attrs.audioPlayStopPress}
          audioIsPlaying={attrs.audioIsPlaying}
          audioProgress={attrs.audioProgress}
          audioRight={false}
        />
      ) : (
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
              <ImageView src={R.drawable.chat_avatar_left} />
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
    </>
  );
}
