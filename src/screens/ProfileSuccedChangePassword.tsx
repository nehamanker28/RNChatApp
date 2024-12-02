/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StatusBar, View, TouchableOpacity} from 'react-native';
import {BaseComponent} from '../commons/BaseComponent';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {R} from '../constant';
import {Divider} from '../res/widgets/Divider';
import {GradiantContainerSolid} from '../res/widgets/GradiantContainerSolid';
import {GradiantContainer} from '../res/widgets/GradiantContainer';
import {ImageButton} from '../res/widgets/ImageButton';
import {ImageView} from '../res/widgets/ImageView';
import {TextView} from '../res/widgets/TextView';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {BaseException} from '../commons/BaseException';
import {Center} from '../res/widgets/Center';
import {Container} from '../res/widgets/Container';
import {CountryPicker} from 'react-native-country-codes-picker';
import {EditText} from '../res/widgets/EditText';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Profile} from '../models/profile';
import {DateView} from '../res/widgets/DateView';
import moment from 'moment';
import {Logger} from '../commons/Logger';
import {Padding} from '../res/widgets/Padding';
import {Row} from '../res/widgets/Row';
import LinearGradient from 'react-native-linear-gradient';

export class ProfileSucceedChangePassword extends BaseComponent {
  profile: Profile;
  state: {};

  constructor(props: any) {
    super(props);
    this.profile = this.navigation.arguments.profile;
    this.state = {
      ...super.state,
      ...{},
    };
  }

  onCreateView(): JSX.Element {
    return (
      //<ScrollView bounces={false}>
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
                  text={'Security'}
                  textSize={24}
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
                marginTop: -16,
                paddingTop: 24,
                paddingEnd: 28,
                paddingStart: 28,
                borderTopEndRadius: 16,
                borderTopStartRadius: 16,
              }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Center>
                  <TextView
                    text={R.string.passwordChangedSuccessfully}
                    textColor={'black'}
                    textSize={20}
                    textStyle={'bold'}
                  />
                </Center>
                <Center>
                  <TextView
                    text={R.string.PleaseRelogin}
                    textColor={'black'}
                    textSize={16}
                    marginTop={30}
                  />
                </Center>
              </View>
              <View style={{flex: 0.3}}>
                <TouchableOpacity
                style = {{height:52}}
                  onPress={() => {
                    this.navigation.push(R.id.login_screen, {
                      profile: this.profile,
                    });
                  }}>
                  <LinearGradient
                    colors={['#7A47FF', '#A555DE', '#DB68B3', '#FF7497']}
                    style={{
                      borderRadius: 8,
                     
                    }}
                    start={{y: 0.0, x: 0.0}}
                    end={{y: 1.0, x: 1.0}}>
                    <View
                      style={{
                        //flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        paddingVertical:10,
                        paddingHorizontal:30,
                       
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <TextView
                          text="Log In"
                          textColor={'white'}
                          textSize={20}
                          textStyle={'normal'}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </SafeAreaInsetsContext.Consumer>
      //</ScrollView>
    );
  }

  onViewCreated(): void {}

  is_form_valid(): boolean {
    return false;
  }

  open_photo_picker() {
    const options: ImageLibraryOptions & CameraOptions = {
      mediaType: 'photo',
      videoQuality: 'high',
      quality: 1,
      maxWidth: 256,
      maxHeight: 256,
      includeBase64: true,
      cameraType: 'front',
      selectionLimit: 1,
      saveToPhotos: false,
      durationLimit: 0,
    };

    this.lifecycleScope<void>(async () => {
      const result = await launchImageLibrary(options);
      if (result.didCancel !== true) {
        let source = result.assets![0].base64;
        this.setState({avatar: source});
        console.error(source);
      }
    })
      .then((_: void) => {})
      .catch((_: BaseException) => {
        // error unlikely
      });
  }
}
