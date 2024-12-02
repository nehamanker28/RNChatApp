/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {ColorValue, Image, SafeAreaView, StatusBar, View} from 'react-native';
import {R} from '../../constant';

interface Props {
  children: ReactNode;
  statusBarColor?: ColorValue;
  statusBarAppearance?: any;
  headerImage?: any;
  footerImage?: any;
}

const defaultProps = {
  statusBarColor: R.color.colorPrimary,
  statusBarAppearance: 'light-content',
};

export function Scaffold(props: Props): JSX.Element {
  const attrs = {...defaultProps, ...props};
  return (
    <>
      <StatusBar barStyle={attrs.statusBarAppearance} />
      {props.headerImage ? (
        <Image source={props.headerImage.src} style={{width: '100%'}} />
      ) : null}
      {props.footerImage ? (
        <Image
          source={props.footerImage.src}
          style={{width: '100%', position: 'absolute', bottom: 0}}
        />
      ) : null}
      <SafeAreaView style={{flex: 0, backgroundColor: attrs.statusBarColor}} />
      <SafeAreaView
        style={{
          flex: 1,
          position: 'relative',
        }}>
        {attrs.children}
      </SafeAreaView>
    </>
  );
}
