import React, { Component } from 'react';
import { View, StatusBar, Text, ScrollView } from 'react-native';
import { Scaffold } from '../res/widgets/Scaffold';
import { ImageButton } from '../res/widgets/ImageButton';
import { ImageView } from '../res/widgets/ImageView';
import { BaseComponent } from '../commons/BaseComponent';
import { GradiantContainerSolid } from '../res/widgets/GradiantContainerSolid';
import { TextView } from '../res/widgets/TextView';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Divider } from '../res/widgets/Divider';
import { R } from '../constant';
import { WebView } from 'react-native-webview';

const htmlStr = `<h1>HTML Ipsum Presents</h1>
<p><strong>Pellentesque habitant morbi tristique</strong>
senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>
Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>,
ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum,
eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a>
in turpis pulvinar facilisis. Ut felis.</p>
<p><strong>Pellentesque habitant morbi tristique</strong>
senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, 
feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>
Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>,
ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum,
eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a>
in turpis pulvinar facilisis. Ut felis.</p>
<p><strong>Pellentesque habitant morbi tristique</strong>
senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>
Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>,
ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum,
eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a>
in turpis pulvinar facilisis. Ut felis.</p>

`
export class ProfilePrivacyScreen extends BaseComponent {

  onCreateView(): JSX.Element {

    return (
      <ScrollView bounces={false}>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <>
              <StatusBar barStyle={'light-content'} />
              <GradiantContainerSolid borderRadius={0} zIndex={-1}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    width: '100%',
                    paddingStart: 32,
                    paddingEnd: 32,
                    marginTop: insets!.top + 32,
                    paddingBottom: 48,
                  }}>
                  <ImageButton
                    src={R.drawable.ic_back_arrow_blue}
                    size={16}
                    height={32}
                    width={32}
                    borderRadius={64}
                    elevation={0}
                    backgroundColor={'white'}
                    onClick={() => {
                      this.navigation.pop();
                    }}
                  />
                  <TextView
                    text={'Privacy Policy'}
                    textSize={28}
                    textColor={'white'}
                    textStyle={'bold'}
                  />
                  <Divider
                    height={36}
                    width={36}
                    backgroundColor={R.color.transparent}
                  />
                </View>
              </GradiantContainerSolid>

              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  marginTop: -16,
                  paddingTop: 24,
                  paddingEnd: 28,
                  paddingStart: 28,
                  marginBottom: insets?.bottom,
                  borderTopEndRadius: 24,
                  borderTopStartRadius: 24,
                  //height :100,
                }}>
              </View>
              <View style={{
                paddingEnd: 28,
                paddingStart: 28,
                marginBottom: insets?.bottom,

              }}>
                <WebView
                  style={{
                    flex: 1,
                    height: 700,
                  }}
                  automaticallyAdjustContentInsets={false}
                  originWhitelist={['*']}
                  source={{ html: '<meta name="viewport" content="width=device-width, initial-scale=1">' + htmlStr }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                />
              </View>
            </>
          )}
        </SafeAreaInsetsContext.Consumer>
      </ScrollView>

    )
  }
  onViewCreated(): void { }

}
