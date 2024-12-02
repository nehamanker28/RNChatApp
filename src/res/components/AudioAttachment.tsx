/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Platform, View} from 'react-native';
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

interface Props {
  message: Message;
  attachment: Attachment;
  audioPlayStopPress: any;
  audioSeekStart: any;
  audioSeekStop: any;
  audioIsPlaying?: boolean;
  audioProgress: number;
  audioRight: boolean;
  avatar?: string;
}

const defaultProps = {
  audioIsPlaying: false,
  audioProgress: 0.6,
  audioEnabled: false,
};

export function AudioAttachment(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const actionViewMarginTop = 10;
  const sliderMargin = Platform.OS === 'ios' ? 12 : 0;
  const durationMarginStart = Platform.OS === 'ios' ? 100 : 94;
  const durationMarginTop = Platform.OS === 'ios' ? -4 : -12;
  const imageSize = 40;
  return (
    <>
      <View
        style={{
          flexDirection: attrs.audioRight ? 'row-reverse' : 'row',
          marginEnd: 80,
          marginStart: 16,
          marginBottom: 8,
          marginTop: 8,
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: '#F2F2F2',
              paddingVertical: 12,
              paddingHorizontal: 8,
              borderRadius: 8,
            }}>
            {/* <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                marginTop: 4,
                marginEnd: 6,
                end: 0,
              }}>
              <ImageView
                src={R.drawable.ic_double_tick}
                height={14}
                width={14}
              />
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                marginStart: 12,
              }}>
              <View
                style={{
                  backgroundColor: '#D9D9D9',
                  borderRadius: 50,
                  width: imageSize,
                  height: imageSize,
                }}>
                <ImageView
                  src={
                    attrs.avatar === undefined
                      ? R.drawable.chat_avatar_left
                      : attrs.avatar
                  }
                  borderRadius={50}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    end: 0,
                  }}>
                  <ImageView
                    src={R.drawable.ic_record}
                    height={18}
                    width={18}
                  />
                </View>
              </View>

              {attrs.attachment.status === AttachmentStatus.PROCESSING ? (
                <ActivityIndicator size={'small'} style={{marginStart: 12}} />
              ) : (
                <ImageButton
                  src={getActionIcon(attrs.attachment, attrs.audioIsPlaying)}
                  height={18}
                  width={18}
                  size={18}
                  backgroundColor={undefined}
                  marginStart={12}
                  marginTop={actionViewMarginTop}
                  onClick={() => {
                    attrs.audioPlayStopPress(attrs.message, attrs.attachment);
                  }}
                />
              )}

              <Slider
                style={{
                  width: '60%',
                  marginStart: sliderMargin,
                }}
                minimumValue={0}
                maximumValue={1}
                value={attrs.audioProgress}
                thumbTintColor="#847F7F"
                minimumTrackTintColor="#878484"
                maximumTrackTintColor="#878484"
                disabled={true}
                onSlidingStart={(value: number) => {
                  attrs.audioSeekStart(attrs.message, attrs.attachment, value);
                }}
                onSlidingComplete={(value: number) => {
                  attrs.audioSeekStop(attrs.message, attrs.attachment, value);
                }}
              />

              {/* <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: actionViewMarginTop,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: seekBarWidth - 30,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      start: 0,
                    }}>
                    <TextView
                      text={attrs.attachment.getDuration()}
                      textColor={'#A5A5A5'}
                      textSize={9}
                      marginTop={16}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      end: 0,
                    }}>
                    <TextView
                      text={attrs.message.getTimeStatus()}
                      textColor={'#A5A5A5'}
                      textSize={9}
                      marginTop={16}
                    />
                  </View>
                </View>
              </View> */}
            </View>
            <TextView
              text={attrs.attachment.getDuration()}
              textColor={'#A5A5A5'}
              textSize={9}
              marginStart={durationMarginStart}
              marginTop={durationMarginTop}
            />
          </View>
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

  function getStatus(attachment: Attachment): string {
    switch (attachment.status) {
      case AttachmentStatus.PENDING:
        return 'Pending';
      case AttachmentStatus.PROCESSING:
        return 'Processing';
      case AttachmentStatus.ERROR:
        return 'Failed';
      case AttachmentStatus.SUCCESS:
        return 'Sent';
    }
    return '';
  }

  function getActionIcon(attachment: Attachment, isPlaying: boolean): any {
    switch (attachment.getAction()) {
      case AttachmentAction.SETTLED:
        return isPlaying ? R.drawable.ic_stop : R.drawable.ic_play;
      case AttachmentAction.DOWNLOAD:
        return isPlaying ? R.drawable.ic_stop : R.drawable.ic_play;
      case AttachmentAction.UPLOAD:
        return isPlaying ? R.drawable.ic_stop : R.drawable.ic_play;
    }
    return R.drawable.ic_error;
  }
}
