/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {R} from '../../constant';

interface Props {}

const defaultProps = {};

export function ProgressDialog(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};

  return (
    <Modal onRequestClose={() => null} transparent>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#000000',
          justifyContent: 'center',
          opacity: 0.6,
        }}>
        <View
          style={{
            borderRadius: 10,
            padding: 25,
          }}>
          <ActivityIndicator size="large" color={R.color.activityIndicator} />
        </View>
      </View>
    </Modal>
  );
}
