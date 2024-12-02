/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BaseComponent} from '../commons/BaseComponent';
import Video from 'react-native-video';
import {View} from 'react-native';
import {Message} from '../models/message';
import {Attachment} from '../models/attachment';
import {R} from '../constant';
import {ImageButton} from '../res/widgets/ImageButton';

export class VideoScreen extends BaseComponent {
  message: Message;
  attachment: Attachment;

  constructor(props: any) {
    super(props);
    this.message = this.navigation.arguments.message;
    this.attachment = this.navigation.arguments.attachment;
  }

  onCreateView(): JSX.Element {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: R.color.light_grey,
          padding: 8,
        }}>
        <ImageButton
          src={R.drawable.ic_back_arrow_blue}
          size={16}
          height={32}
          width={32}
          marginBottom={5}
          borderRadius={64}
          elevation={0}
          backgroundColor={'white'}
          onClick={() => {
            this.navigation.pop();
          }}
        />
        <Video
          resizeMode="contain"
          source={{
            uri: this.attachment.url,
          }}
          style={{
            height: '80%',
            width: '100%',
          }}
          controls={true}
        />
      </View>
    );
  }
}
