/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import {R} from '../../constant';
import {ImageView} from '../widgets/ImageView';
import {TextView} from '../widgets/TextView';
import {Message, MessageStatus} from '../../models/message';
import Slider from '@react-native-community/slider';
import {ImageButton} from '../widgets/ImageButton';
import {ActivityIndicator} from 'react-native-paper';
import {
  Attachment,
  AttachmentAction,
  AttachmentStatus,
} from '../../models/attachment';
import {Utils} from '../../commons/Utils';
import {Container} from '../widgets/Container';

interface Props {
  message: Message;
  attachment: Attachment;
  audioPlayStopPress: any;
  audioIsPlaying?: boolean;
  audioProgress: number;
  audioRight: boolean;
}

const defaultProps = {
  audioIsPlaying: false,
  audioProgress: 0.6,
  audioEnabled: false,
  audioRight: true,
};

export function VideoAttachment(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        {!attrs.audioRight && (
          // <Container height={42} width={42} marginStart={16} marginTop={8}>
          //   <ImageView src={R.drawable.chat_avatar_left} />
          // </Container>
          <Container marginStart={8}>
            <ImageView
              src={R.drawable.chat_avatar_left}
              height={42}
              width={42}
              resizeMode={'cover'}
              borderRadius={80}
            />
          </Container>
        )}
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: attrs.audioRight ? 'row-reverse' : 'row',
              marginEnd: 80,
              marginStart: !attrs.audioRight ? 10 : 0,
              marginTop: 8,
            }}>
            <View
              style={{
                height: 200,
                width: '90%',
                borderRadius: 12,
                borderWidth: 8,
                borderColor: attrs.audioRight
                  ? R.color.colorAccent
                  : R.color.grey,
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: 12,
                }}
                source={{
                  uri: attrs.attachment.thumbnail,
                }}
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  backgroundColor: '#22222220',
                }}
                activeOpacity={0.9}
                onPress={() => {
                  attrs.audioPlayStopPress(attrs.message, attrs.attachment);
                }}>
                <ImageView
                  src={R.drawable.ic_video_play}
                  height={56}
                  width={56}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: attrs.audioRight ? 'row-reverse' : 'row',
              marginEnd: 80,
              marginStart: 24,
            }}>
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
                const statusImage = getStatusImage(
                  attrs.message,
                  attrs.attachment,
                );
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
    </>
  );

  function getStatusImage(message: Message, attachment: Attachment): any {
    if (attachment.url !== null) {
      switch (message.status) {
        case MessageStatus.created:
          return R.drawable.ic_message_created;
        case MessageStatus.delivered:
          return R.drawable.ic_message_delivered;
        case MessageStatus.acknowledged:
          return R.drawable.ic_message_acknowledged;
      }
    }
    return null;
  }
}
