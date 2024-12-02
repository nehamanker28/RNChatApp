/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BaseComponent} from '../commons/BaseComponent';
import {Scaffold} from '../res/widgets/Scaffold';
import {GradiantButton} from '../res/widgets/GradiantButton';
import RNFetchBlob from 'rn-fetch-blob';
import {AudioManager} from '../commons/AudioManager';
import {ChatElementLeft} from '../res/components/ChatElementLeft';
import {Message} from '../models/message';
import {View} from 'react-native';
import {TextView} from '../res/widgets/TextView';
import {ImageView} from '../res/widgets/ImageView';
import {R} from '../constant';
import Slider from '@react-native-community/slider';

export class TestScreen extends BaseComponent {
  state: {};

  constructor(props: any) {
    super(props);
    this.state = {
      ...super.state,
      ...{},
    };
  }

  onCreateView(): JSX.Element {
    const actionViewMarginTop = 10;
    const seekBarWidth = 164;
    const imageSize = 40;
    return (
      <Scaffold>
        <View
          style={{
            flexDirection: 'row-reverse',
            marginEnd: 80,
            marginStart: 16,
            marginBottom: 8,
            marginTop: 8,
          }}>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: '#F2F2F2',
              paddingVertical: 12,
              paddingHorizontal: 8,
              borderRadius: 8,
            }}>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                marginTop: 4,
                marginEnd: 6,
                end: 0,
              }}>
              <ImageView
                src={R.drawable.ic_message_delivered}
                height={14}
                width={14}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  backgroundColor: '#D9D9D9',
                  borderRadius: 50,
                  width: imageSize,
                  height: imageSize,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    end: 2,
                  }}>
                  <ImageView
                    src={R.drawable.ic_record}
                    height={18}
                    width={18}
                  />
                </View>
              </View>

              <ImageView
                src={R.drawable.ic_play}
                height={18}
                width={18}
                marginStart={12}
                marginTop={actionViewMarginTop}
              />

              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: actionViewMarginTop,
                }}>
                <Slider
                  style={{width: seekBarWidth}}
                  minimumValue={0}
                  maximumValue={1}
                  thumbTintColor="#847F7F"
                  minimumTrackTintColor="#878484"
                  maximumTrackTintColor="#878484"
                />
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
                      text="0.08"
                      textColor={'#A5A5A5'}
                      textSize={10}
                      marginTop={16}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      end: 0,
                    }}>
                    <TextView
                      text="a few second ago"
                      textColor={'#A5A5A5'}
                      textSize={10}
                      marginTop={16}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Scaffold>
    );
  }
  onViewCreated(): void {
    super.onViewCreated();
    this.lifecycleScope<void>(async () => {
      await RNFetchBlob.fetch(
        'PUT',
        'http://www.example.com/upload-form',
        {
          Authorization: 'Bearer access-token',
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'avatar',
            file: RNFetchBlob.wrap('PATH_TO_THE_FILE'),
          },
        ],
      )
        .then(resp => {
          console.info(resp);
        })
        .catch(err => {
          console.error(err);
        });
    })
      .then((_: void) => {})
      .catch((_: any) => {});
  }

  async downloadSample() {
    let dirs = RNFetchBlob.fs.dirs;
    let response = await RNFetchBlob.config({
      path: dirs.CacheDir + '/audio.mp3',
    })
      .fetch(
        'GET',
        'https://file-examples.com/storage/fee472ce6e64b122ba0c8b3/2017/11/file_example_MP3_700KB.mp3',
        {},
      )
      .progress({interval: 200}, (received = 0, total = 0) => {
        console.debug(Math.ceil((received / total) * 100));
      });
    console.debug(response.info().status);
  }
}
