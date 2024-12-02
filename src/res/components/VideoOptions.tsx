/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {R} from '../../constant';
import {TextView} from '../widgets/TextView';
import {ImageButton} from '../widgets/ImageButton';

interface Props {
  children: ReactNode;
  onDimiss: any;
}

const defaultProps = {
  marginBottom: 108,
  backgroundColor: '#00000030',
};

export function VideoOptions(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  const attachmentItems = [
    {name: 'Upload', image: R.drawable.ic_video_attachment_upload},
    {name: 'Capture', image: R.drawable.ic_video_attachment_capture},
  ];
  const children = [];
  for (let i = 0; i < attachmentItems.length; i++) {
    const item = attachmentItems[i];
    children.push(
      <View style={{alignItems: 'center'}}>
        <ImageButton
          src={item.image}
          height={56}
          width={56}
          borderRadius={80}
          backgroundColor={'#B4B4B5'}
          size={24}
          elevation={0}
        />
        <TextView text={item.name} textSize={12} marginTop={4} />
      </View>,
    );
  }

  return (
    <Modal transparent>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: attrs.backgroundColor,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: '90%',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: R.color.grey,
              backgroundColor: 'white',
              paddingStart: 12,
              paddingEnd: 12,
              paddingTop: 16,
              paddingBottom: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              {children}
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                attrs.onDimiss();
              }}>
              <View
                style={{
                  height: 42,
                  backgroundColor: '#E4E4E4',
                  marginTop: 24,
                  borderRadius: 8,
                  justifyContent: 'center',
                  marginEnd: 4,
                  marginStart: 4,
                  alignItems: 'center',
                }}>
                <TextView
                  text="Cancel"
                  textColor={R.color.colorAccent}
                  textStyle={'bold'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            attrs.onDimiss();
          }}>
          <View
            style={{
              height: attrs.marginBottom,
              backgroundColor: attrs.backgroundColor,
            }}></View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
