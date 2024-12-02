/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BaseComponent} from '../commons/BaseComponent';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {R} from '../constant';
import {ImageButton} from '../res/widgets/ImageButton';
import {Divider} from '../res/widgets/Divider';
import {ImageView} from '../res/widgets/ImageView';
import {Utils} from '../commons/Utils';
import {Thread} from '../models/thread';
import {Logger} from '../commons/Logger';
import {Profile} from '../models/profile';
import Clipboard from '@react-native-community/clipboard';
import {Share} from 'react-native';
import {ContextMenuAction} from 'react-native-context-menu-view';
import {Platform} from 'react-native';
import {Message} from '../models/message';
import {Repository} from '../commons/Repository';
import {ChatInput} from '../res/widgets/ChatInput';
import {AudioManager} from '../commons/AudioManager';
import {RealmContext} from '../../App';
import {ChatElementLeft} from '../res/components/ChatElementLeft';
import {ChatElementRight} from '../res/components/ChatElementRight';
import {File} from '../models/file';
import {Attachment, AttachmentAction} from '../models/attachment';
import {AttachmentOptions} from '../res/components/AttachmentOptions';
import {TextView} from '../res/widgets/TextView';
import {CustomizedSendButton} from '../res/components/CustomizedSendButton';

const {useQuery} = RealmContext;

export class ChatScreenComponent extends BaseComponent {
  am: AudioManager;
  query: string;
  thread: Thread;
  profile: Profile;
  actions: Array<ContextMenuAction>;
  data: Realm.Results<Message>;
  audioPath: string | null = null;

  state: {
    keyboard: boolean;
    input: string;
    recordTime: number;
    hasAudioPermissions: boolean;
    audioProgress: number;
    audioDuration: number;
    audioPlaying: boolean;
    showAttachmentPicker: boolean;
    loading: boolean;
  };

  constructor(props: any) {
    super(props);
    this.profile = this.navigation.arguments.profile;
    this.query = this.navigation.arguments.query;
    this.thread = this.navigation.arguments.thread;
    this.data = this.props.data;
    this.am = new AudioManager(
      this,
      (recordingTimeInSeconds: number) => {
        this.setState({recordTime: recordingTimeInSeconds});
      },
      (audioFile: File) => {
        console.info('Message Upload Audio', audioFile);
        this.postMessage(
          Message.newInstance({
            sender: this.profile._id,
            file: audioFile,
          }),
        );
      },
      (
        totalTimeInSeconds: number,
        progressTimeInSeconds: number,
        isPlaying: boolean,
        source: string | null,
      ) => {
        // console.debug(
        //   'Progress',
        //   (progressTimeInSeconds / totalTimeInSeconds) * 100,
        // );

        if (!isPlaying) {
          this.audioPath = null;
        } else {
          this.audioPath = source;
        }
        this.setState({
          audioProgress: progressTimeInSeconds / totalTimeInSeconds,
          audioDuration: totalTimeInSeconds,
          audioPlaying: isPlaying,
        });
      },
      (granted: boolean) => {
        console.debug('granted', granted);
        this.setState({hasAudioPermissions: granted});
      },
    );
    console.debug(this.profile._id);
    this.actions = [
      {title: 'Copy', systemIcon: 'doc.on.clipboard'},
      {title: 'Share', systemIcon: 'square.and.arrow.up'},
    ];
    this.state = {
      ...super.state,
      ...{
        keyboard: false,
        input: '',
        recordTime: 0,
        hasAudioPermissions: false,
        audioProgress: 0,
        audioDuration: 0,
        audioPlaying: false,
        showAttachmentPicker: false,
        loading: false,
      },
    };
  }

  onCreateView() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={{
              flex: 1,
              paddingTop: insets?.top,
              backgroundColor: R.color.grey,
            }}>
            <StatusBar barStyle={'dark-content'} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
                width: '100%',
                paddingStart: 32,
                paddingEnd: 32,
                paddingBottom: 24,
                backgroundColor: R.color.grey,
              }}>
              <ImageButton
                src={R.drawable.ic_back_arrow}
                size={16}
                height={32}
                marginTop={12}
                width={32}
                borderRadius={64}
                elevation={0}
                backgroundColor={'white'}
                onClick={() => {
                  this.navigation.pop();
                }}
              />
              <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                <ImageView
                  src={R.drawable.askim_logo}
                  height={80}
                  width={142}
                />
              </TouchableOpacity>
              <Divider
                height={36}
                width={36}
                backgroundColor={R.color.transparent}
              />
            </View>

            <View
              style={{
                flexGrow: 1,
                backgroundColor: 'white',
                borderTopEndRadius: 24,
                borderTopStartRadius: 24,
                height: 0,
              }}>
              <FlatList
                contentContainerStyle={{}}
                onEndReached={() => {
                  this.lazyLoad();
                }}
                onEndReachedThreshold={0.5}
                bounces={false}
                inverted={true}
                data={this.data.sorted('created_at', true)}
                keyExtractor={item => item.message_id}
                renderItem={({item}) =>
                  item.isAuthor(this.profile._id) ? (
                    <ChatElementRight
                      message={item}
                      actions={this.actions}
                      avatar={this.profile.avatar}
                      handleActions={(index: number, message: Message) => {
                        this.handleActions(index, message);
                      }}
                      audioIsPlaying={
                        this.audioPath === item.getSingleAudioPath() &&
                        this.state.audioPlaying
                      }
                      audioProgress={
                        this.audioPath === item.getSingleAudioPath()
                          ? this.state.audioProgress
                          : 0
                      }
                      audioPlayStopPress={(
                        message: Message,
                        attachment: Attachment,
                      ) => {
                        console.log('right');
                        this.handleAudioPlayback(
                          message,
                          attachment,
                          this.state.audioProgress,
                        );
                      }}
                      audioSeekStart={(
                        message: Message,
                        attachment: Attachment,
                        value: number,
                      ) => {
                        this.handleAudioSeeking(
                          true,
                          message,
                          attachment,
                          value,
                        );
                      }}
                      audioSeekStop={(
                        message: Message,
                        attachment: Attachment,
                        value: number,
                      ) => {
                        this.handleAudioSeeking(
                          false,
                          message,
                          attachment,
                          value,
                        );
                      }}
                    />
                  ) : (
                    <ChatElementLeft
                      message={item}
                      actions={this.actions}
                      handleActions={(index: number, message: Message) => {
                        this.handleActions(index, message);
                      }}
                      audioIsPlaying={
                        this.audioPath === item.getSingleAudioPath() &&
                        this.state.audioPlaying
                      }
                      audioProgress={
                        this.audioPath === item.getSingleAudioPath()
                          ? this.state.audioProgress
                          : 0
                      }
                      audioPlayStopPress={(
                        message: Message,
                        attachment: Attachment,
                      ) => {
                        this.handleAudioPlayback(
                          message,
                          attachment,
                          this.state.audioProgress,
                        );
                      }}
                      audioSeekStart={(
                        message: Message,
                        attachment: Attachment,
                        value: number,
                      ) => {
                        this.handleAudioSeeking(
                          true,
                          message,
                          attachment,
                          value,
                        );
                      }}
                      audioSeekStop={(
                        message: Message,
                        attachment: Attachment,
                        value: number,
                      ) => {
                        this.handleAudioSeeking(
                          false,
                          message,
                          attachment,
                          value,
                        );
                      }}
                    />
                  )
                }
              />
              {this.state.loading && (
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'center',
                    alignSelf: 'center',
                    paddingLeft: 12,
                    paddingRight: 12,
                    backgroundColor: 'white',
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 24,
                    opacity: 0.9,
                    top: 12,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderColor: R.color.grey,
                    borderWidth: 0.5,
                    alignContent: 'center',
                  }}>
                  <ActivityIndicator
                    size={'small'}
                    color={R.color.colorAccent}
                  />
                  <TextView
                    text="Loading Messages ..."
                    textSize={10}
                    marginTop={2}
                    marginStart={8}
                  />
                </View>
              )}
            </View>

            <ChatInput
              paddingBottom={this.state.keyboard ? 16 : 16 + insets!.bottom}
              paddingTop={16}
              paddingStart={28}
              paddingEnd={28}
              attachmentActive={this.state.showAttachmentPicker}
              enabledAudioRecording={this.state.hasAudioPermissions}
              text={this.state.input}
              recordTime={this.state.recordTime}
              onTextChanged={(value: string) => {
                this.setState({input: value});
              }}
              textBtnPressed={() => {
                let text = this.state.input;
                if (Utils.isNotNullOrEmpty(text)) {
                  this.setState({input: ''});
                  this.postMessage(
                    Message.newInstance({
                      sender: this.profile._id,
                      text: text,
                    }),
                  );
                }
              }}
              audioBtnPressed={() => {
                let text = this.state.input;
                console.log(text);
                if (Utils.isNotNullOrEmpty(text)) {
                  this.setState({input: ''});
                  this.postMessage(
                    Message.newInstance({
                      sender: this.profile._id,
                      text: 'audio : ' + text,
                    }),
                  );
                }
              }}
              videoBtnPressed={() => {
                // this.setState({input: ''});
                // this.postMessage(
                //   Message.newInstance({
                //     sender: this.profile._id,
                //     text: 'video : hello',
                //   }),
                // );
                let text = this.state.input;
                if (Utils.isNotNullOrEmpty(text)) {
                  this.setState({input: ''});
                  this.postMessage(
                    Message.newInstance({
                      sender: this.profile._id,
                      text: 'video : ' + text,
                    }),
                  );
                }
              }}
              onSend={() => {
                console.log('Send');
                // let text = this.state.input;
                // if (Utils.isNotNullOrEmpty(text)) {
                //   this.setState({input: ''});
                //   this.postMessage(
                //     Message.newInstance({
                //       sender: this.profile._id,
                //       text: text,
                //     }),
                //   );
                // }
                // <CustomizedSendButton profile_id= {this.profile._id}></CustomizedSendButton>;
              }}
              onStartRecording={() => {
                this.am.startRecording();
              }}
              onStopRecording={() => {
                this.am.stopRecording();
              }}
              onCancelRecording={() => {
                this.am.cancelRecording();
              }}
              onAttachmentClick={() => {
                if (!this.state.showAttachmentPicker) {
                  this.showDialog(
                    <AttachmentOptions
                      onDimiss={() => {
                        this.hideDialog();
                        this.setState({
                          showAttachmentPicker:
                            !this.state.showAttachmentPicker,
                        });
                      }}
                    />,
                  );
                }
                this.setState({
                  showAttachmentPicker: !this.state.showAttachmentPicker,
                });
              }}
            />
            {Platform.OS === 'ios' && (
              <KeyboardSpacer
                onToggle={(value: boolean) => {
                  this.setState({keyboard: value});
                }}
              />
            )}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
  onViewCreated(): void {
    if (!this.state.hasAudioPermissions) {
      this.am.requestAudioPermissions();
    }
    //this.am.requestAudioPermissions();
    this.tempRefresh();
  }

  onResume(): void {
    super.onResume();
    if (!this.state.hasAudioPermissions) {
      this.am.requestAudioPermissions();
    }
    //this.am.requestAudioPermissions();
  }

  onPause(): void {
    super.onResume();
    this.am.pausePlaying();
  }

  onDestroyView(): void {
    super.onDestroyView();
    this.am.pausePlaying();
  }

  postMessage(message: Message) {
    const repository = global.repository as Repository;
    repository.postMessage(this, this.thread, message);
  }

  handleActions(index: number, message: Message) {
    switch (index) {
      case 0:
        Clipboard.setString(message.message_text!);
        break;
      case 1:
        Share.share({
          message: message.message_text!.toString(),
        })
          .then(_ => Logger.info(this, 'message shared'))
          .catch(_ => Logger.error(this, 'message sharing fail'));
        break;
    }
  }

  handleAudioSeeking(
    isStart: boolean,
    message: Message,
    attachment: Attachment,
    value: number,
  ) {
    console.log('isStart', isStart);
    var path = '';
    if (Platform.OS === 'ios' && attachment.path! != null) {
      path = attachment.path!.substring(attachment.path!.lastIndexOf('/') + 1);
    } else {
      path = attachment.path!;
    }
    if (this.audioPath === path && this.state.audioPlaying) {
      if (isStart) {
        this.setState({audioPlaying: false});
        this.am.pausePlaying();
      } else {
        this.am.resumePlaying();
      }
    }
  }

  handleAudioPlayback(
    message: Message,
    attachment: Attachment,
    audioProgress: number,
  ) {
    var path = '';
    if (Platform.OS === 'ios' && attachment.path! != null) {
      path = attachment.path!.substring(attachment.path!.lastIndexOf('/') + 1);
    } else {
      path = attachment.path!;
    }
    console.log('stopPlaying', this.state.audioPlaying);
    switch (attachment.mimetype) {
      case 'audio/mp3':
      case 'audio/m4a':
      case 'audio/wav':
        switch (attachment.getAction()) {
          case AttachmentAction.SETTLED:
          case AttachmentAction.UPLOAD:
            console.log('UPLOAD');
            if (this.audioPath === path && this.state.audioPlaying) {
              console.log('audioProgress', audioProgress);

              this.handleAudioSeeking(
                this.state.audioPlaying,
                message,
                attachment,
                audioProgress,
              );

              //this.am.stopPlaying();
            } else {
              this.am.pausePlaying();
              this.am.startPlaying(path);
            }
            break;
          case AttachmentAction.DOWNLOAD:
            console.log('DOWNLOAD');
            const repository = global.repository as Repository;
            this.lifecycleScope<void>(async () => {
              await repository.downloadAttachment(attachment);
            })
              .then((_: void) => {
                this.handleAudioPlayback(
                  message,
                  attachment,
                  this.state.audioProgress,
                );
              })
              .catch((_: Error) => {
                console.error('download error');
              });
            break;
        }
        break;
      case 'video/mp4':
        this.am.pausePlaying();
        this.navigation.push(R.id.video_screen, {
          message: message,
          attachment: attachment,
        });
        break;
    }
  }

  tempRefresh() {
    this.lifecycleScope<void>(async () => {
      await Utils.delay(10 * 1000);
      const repository = global.repository as Repository;
      await repository.fetchMessages(this.thread);
    })
      .then((_: void) => {
        this.tempRefresh();
      })
      .catch((_: any) => {});
  }

  lazyLoad() {
    this.setState({loading: true});
    this.lifecycleScope<void>(async () => {
      await Utils.delay(1000);
      const repository = global.repository as Repository;
      await repository.lazyFetchMessages(this.thread);
    })
      .then((_: void) => {
        this.setState({loading: false});
      })
      .catch((_: any) => {
        this.setState({loading: false});
      });
  }
}

export function ChatScreen(props: any): JSX.Element {
  let data = useQuery(Message);
  return <ChatScreenComponent {...props} data={data} />;
}
