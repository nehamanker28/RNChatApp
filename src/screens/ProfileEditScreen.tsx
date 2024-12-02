/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {BaseComponent} from '../commons/BaseComponent';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {R} from '../constant';
import {Divider} from '../res/widgets/Divider';
import {GradiantContainerSolid} from '../res/widgets/GradiantContainerSolid';
import {ImageButton} from '../res/widgets/ImageButton';
import {ImageView} from '../res/widgets/ImageView';
import {TextView} from '../res/widgets/TextView';
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
import {GradiantButton} from '../res/widgets/GradiantButton';
import Snackbar from 'react-native-snackbar';
import {Api} from '../commons/Api';
import {Prefs} from '../commons/Prefs';
import {Utils} from '../commons/Utils';

export class ProfileEditScreen extends BaseComponent {
  profile: Profile;
  state: {
    avatar: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    phone: string | undefined;
    street_address: string;
    first_name_error: string;
    last_name_error: string;
    street_address_error: string;
    country_picker: boolean;
    country: string;
    submittable: boolean;
  };

  constructor(props: any) {
    super(props);
    this.profile = this.navigation.arguments.profile;
    this.state = {
      ...super.state,
      ...{
        avatar: this.profile.avatar,
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        phone: this.profile.phone,
        street_address: '',
        first_name_error: '',
        last_name_error: '',
        street_address_error: '',
        country_picker: false,
        country: 'US',
        submittable: false,
      },
    };
  }

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
                    text={'Personal Info'}
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
                  backgroundColor: 'white',
                  marginTop: -16,
                  paddingTop: 24,
                  paddingEnd: 28,
                  paddingStart: 28,
                  marginBottom: insets?.bottom,
                  borderTopEndRadius: 24,
                  borderTopStartRadius: 24,
                }}>
                <Center>
                  <Container>
                    <ImageView
                      src={
                        this.state.avatar === undefined
                          ? R.drawable.placeholder_avatar
                          : this.state.avatar
                      }
                      height={96}
                      width={96}
                      marginTop={8}
                      resizeMode={'cover'}
                      borderRadius={80}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        end: 2,
                        bottom: 4,
                      }}>
                      <ImageButton
                        src={R.drawable.ic_edit}
                        height={24}
                        width={24}
                        size={12}
                        elevation={0}
                        backgroundColor={R.color.colorAccent}
                        marginTop={32}
                        onClick={() => {
                          this.open_photo_picker();
                        }}
                      />
                    </View>
                  </Container>
                </Center>

                <TextView text={'First Name'} marginTop={48} textSize={12} />

                <EditText
                  hint={R.string.editProfileFirstNameHint}
                  text={this.state.first_name}
                  error={this.state.first_name_error}
                  borderRadius={0}
                  stroke={2}
                  textSize={16}
                  borderTopColor={'white'}
                  borderEndColor={'white'}
                  borderStartColor={'white'}
                  borderBottomColor={R.color.grey_light}
                  paddingStart={0}
                  paddingEnd={0}
                  onTextChanged={(value: string) => {
                    this.setState({first_name: value});
                  }}
                />

                <TextView text={'Last Name'} marginTop={16} textSize={12} />

                <EditText
                  hint={R.string.editProfileLastNameHint}
                  text={this.state.last_name}
                  error={this.state.last_name_error}
                  borderRadius={0}
                  stroke={2}
                  textSize={16}
                  borderTopColor={'white'}
                  borderEndColor={'white'}
                  borderStartColor={'white'}
                  borderBottomColor={R.color.grey_light}
                  paddingStart={0}
                  paddingEnd={0}
                  onTextChanged={(value: string) => {
                    this.setState({last_name: value});
                  }}
                />

                <TextView text={'Email'} marginTop={16} textSize={12} />

                <EditText
                  text={this.profile.email}
                  borderRadius={0}
                  stroke={2}
                  textSize={16}
                  borderTopColor={'white'}
                  borderEndColor={'white'}
                  borderStartColor={'white'}
                  borderBottomColor={R.color.grey_light}
                  paddingStart={0}
                  paddingEnd={0}
                  onTextChanged={(value: string) => {
                    this.setState({first_name: value});
                  }}
                />

                <TextView text={'Phone Number'} marginTop={16} textSize={12} />

                <EditText
                  text={this.state.phone}
                  drawableLeft={
                    this.state.country === 'US'
                      ? R.drawable.ic_flag_us
                      : R.drawable.ic_flag_in
                  }
                  stroke={2}
                  textSize={16}
                  borderRadius={0}
                  borderTopColor={'white'}
                  borderEndColor={'white'}
                  borderStartColor={'white'}
                  drawableLeftMargin={0}
                  borderBottomColor={R.color.grey_light}
                  keyboardType="numeric"
                  drawableLeftSecondary={R.drawable.ic_dropdown}
                  drawableLeftClick={() => {
                    this.setState({country_picker: true});
                  }}
                  drawableRight={R.drawable.ic_phone}
                  hint={
                    (this.state.country === 'US' ? '+1 ' : '+91 ') +
                    R.string.completeProfilePhoneNumberHint
                  }
                  marginTop={8}
                  onTextChanged={(value: string) => {
                    this.setState({phone: value});
                  }}
                />

                <TextView text={'Date of Birth'} marginTop={16} textSize={12} />

                <DateView
                  onConfirm={(value: Date) => {
                    let date = moment(value).format('YYYY-DD-MM');
                    Logger.debug(this, date);
                  }}
                />

                <TextView
                  text={'Street Address'}
                  marginTop={16}
                  textSize={12}
                />

                <EditText
                  hint={R.string.editProfileStreetAddressHint}
                  text={this.state.street_address}
                  error={this.state.street_address_error}
                  borderRadius={0}
                  stroke={2}
                  textSize={16}
                  borderTopColor={'white'}
                  borderEndColor={'white'}
                  borderStartColor={'white'}
                  borderBottomColor={R.color.grey_light}
                  paddingStart={0}
                  paddingEnd={0}
                  onTextChanged={(value: string) => {
                    this.setState({first_name: value});
                  }}
                />

                <GradiantButton
                  text="Save"
                  paddingTop={12}
                  paddingBottom={12}
                  borderRadius={4}
                  marginBottom={32}
                  fontSize={12}
                  marginTop={32}
                  onClick={() => {
                    if (this.is_form_valid()) {
                      this.updateProfile(
                        this.state.first_name!,
                        this.state.last_name!,
                        this.state.phone,
                        this.state.avatar,
                      );
                    }
                  }}
                />

                <CountryPicker
                  show={this.state.country_picker}
                  pickerButtonOnPress={item => {
                    this.setState({
                      country_picker: false,
                      country: item.code,
                    });
                  }}
                  lang="en"
                  showOnly={['US', 'IN']}
                  style={{}}
                />
                <KeyboardSpacer />
              </View>
            </>
          )}
        </SafeAreaInsetsContext.Consumer>
      </ScrollView>
    );
  }

  onViewCreated(): void {}

  is_form_valid(): boolean {
    this.setState({first_name_error: '', last_name_error: ''});
    if (Utils.isNullOrEmpty(this.state.first_name)) {
      this.setState({first_name_error: 'Please enter your first name'});
    } else if (Utils.isNullOrEmpty(this.state.last_name)) {
      this.setState({lastname_error: 'Please enter your last name'});
    } else {
      return true;
    }
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
        const source = result.assets![0].base64;
        this.setState({avatar: source});
      }
    })
      .then((_: void) => {})
      .catch((_: BaseException) => {
        // error unlikely
      });
  }

  updateProfile(
    first_name: string | undefined,
    last_name: string | undefined,
    phone: string | undefined,
    avatar: string | undefined,
  ) {
    this.lifecycleScope<Profile>(async () => {
      const profile = await Api.account_profile_update(
        first_name,
        last_name,
        phone,
        avatar,
      );
      await Prefs.setProfile(profile);
      return profile;
    }, true)
      .then((profile: Profile) => {
        this.navigation.arguments.callback(profile);
        this.navigation.pop();
      })
      .catch((error: BaseException) => {
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  }
}
