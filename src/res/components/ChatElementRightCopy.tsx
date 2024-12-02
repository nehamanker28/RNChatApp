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

interface Props {
  message: Message;
  actions: Array<ContextMenuAction>;
  handleActions: any;
  audioPlayStopPress: any;
  audioIsPlaying?: boolean;
  audioProgress: number;
  avatar?: string;
}

const defaultProps = {};

export function ChatElementRightCopy(props: Props): JSX.Element {
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
          audioRight={true}
        />
      ) : (
        // <View
        //   style={{
        //     flexDirection: 'row-reverse',
        //     marginEnd: 80,
        //     marginStart: 16,
        //     marginBottom: 8,
        //     marginTop: 8,
        //   }}>
        //   <View
        //     style={{
        //       flexDirection: 'column',
        //       backgroundColor: '#F2F2F2',
        //       paddingVertical: 12,
        //       paddingHorizontal: 8,
        //       borderRadius: 8,
        //     }}>
        //     <View
        //       style={{
        //         flexDirection: 'row',
        //         position: 'absolute',
        //         marginTop: 4,
        //         marginEnd: 6,
        //         end: 0,
        //       }}>
        //       <ImageView
        //         src={R.drawable.ic_double_tick}
        //         height={14}
        //         width={14}
        //       />
        //     </View>
        //     <View
        //       style={{
        //         flexDirection: 'row',
        //       }}>
        //       <View
        //         style={{
        //           backgroundColor: '#D9D9D9',
        //           borderRadius: 50,
        //           width: imageSize,
        //           height: imageSize,
        //         }}>
        //         <View
        //           style={{
        //             position: 'absolute',
        //             bottom: 2,
        //             end: 2,
        //           }}>
        //           <ImageView
        //             src={R.drawable.ic_record}
        //             height={18}
        //             width={18}
        //           />
        //         </View>
        //       </View>

        //       <ImageButton
        //         src={
        //           attrs.audioIsPlaying ? R.drawable.ic_stop : R.drawable.ic_play
        //         }
        //         height={18}
        //         width={18}
        //         size={18}
        //         backgroundColor={undefined}
        //         marginStart={12}
        //         marginTop={actionViewMarginTop}
        //         onClick={() => {
        //           attrs.audioPlayStopPress(attrs.message);
        //         }}
        //       />

        //       <View
        //         style={{
        //           flexDirection: 'column',
        //           alignItems: 'center',
        //           marginTop: actionViewMarginTop,
        //         }}>
        //         <Slider
        //           style={{width: seekBarWidth}}
        //           minimumValue={0}
        //           maximumValue={1}
        //           value={attrs.audioProgress}
        //           thumbTintColor="#847F7F"
        //           minimumTrackTintColor="#878484"
        //           maximumTrackTintColor="#878484"
        //           disabled={true}
        //         />
        //         <View
        //           style={{
        //             flexDirection: 'row',
        //             alignItems: 'center',
        //             width: seekBarWidth - 30,
        //           }}>
        //           <View
        //             style={{
        //               position: 'absolute',
        //               start: 0,
        //             }}>
        //             <TextView
        //               text={attrs.message.getSingleAudioDuration()}
        //               textColor={'#A5A5A5'}
        //               textSize={9}
        //               marginTop={16}
        //             />
        //           </View>
        //           <View
        //             style={{
        //               position: 'absolute',
        //               end: 0,
        //             }}>
        //             <TextView
        //               text={attrs.message.getTimeStatus()}
        //               textColor={'#A5A5A5'}
        //               textSize={9}
        //               marginTop={16}
        //             />
        //           </View>
        //         </View>
        //       </View>
        //     </View>
        //   </View>
        // </View>

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
                    text={attrs.message.message_text}
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
