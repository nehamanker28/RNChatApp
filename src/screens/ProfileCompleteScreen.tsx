/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Scaffold} from '../res/widgets/Scaffold';
import {BaseComponent} from '../commons/BaseComponent';
import {R} from '../constant';
import {Center} from '../res/widgets/Center';
import {EditText} from '../res/widgets/EditText';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {GradiantContainer} from '../res/widgets/GradiantContainer';
import {ImageView} from '../res/widgets/ImageView';
import {Padding} from '../res/widgets/Padding';
import {Row} from '../res/widgets/Row';
import {TextView} from '../res/widgets/TextView';
import {Container} from '../res/widgets/Container';
import {ImageButton} from '../res/widgets/ImageButton';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {BaseException} from '../commons/BaseException';
import Snackbar from 'react-native-snackbar';
import {Utils} from '../commons/Utils';
import {Api} from '../commons/Api';
import {Prefs} from '../commons/Prefs';
import {CountryPicker} from 'react-native-country-codes-picker';
import {Logger} from '../commons/Logger';

export class ProfileCompleteScreen extends BaseComponent {
  state: {
    avatar: string | undefined;
    first_name: string;
    last_name: string;
    first_name_error: string;
    last_name_error: string;
    phone: string;
    country_picker: boolean;
    country: string;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      ...super.state,
      ...{
        avatar: undefined,
        first_name: '',
        last_name: '',
        phone: '',
        first_name_error: '',
        last_name_error: '',
        country_picker: false,
        country: 'US',
      },
    };
  }

  onCreateView() {
    return (
      <Scaffold footerImage={R.drawable.splash_bottom_vector}>
        <ScrollView>
          <Center>
            <ImageView
              src={R.drawable.askim_logo}
              height={56}
              marginTop={24}
              marginBottom={32}
            />
            <GradiantContainer
              marginStart={32}
              marginEnd={32}
              marginBottom={16}>
              <Padding
                paddingTop={20}
                paddingStart={16}
                paddingEnd={16}
                paddingBottom={20}>
                <Center>
                  <TextView
                    text={R.string.completeProfileTitle}
                    textColor={'black'}
                    textSize={16}
                  />
                  <TextView
                    text={R.string.completeProfileSummary}
                    marginTop={8}
                    textSize={12}
                    gravity={'center'}
                    marginStart={32}
                    marginEnd={32}
                    textColor={'grey'}
                  />
                  <Container>
                    <ImageView
                      src={
                        this.state.avatar === undefined
                          ? R.drawable.placeholder_avatar
                          : this.state.avatar
                      }
                      height={88}
                      width={88}
                      marginTop={32}
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
                <TextView
                  text={'FIRST NAME'}
                  marginTop={24}
                  marginStart={8}
                  textSize={12}
                />
                <EditText
                  hint={R.string.completeProfileFirstNameHint}
                  text={this.state.first_name}
                  error={this.state.first_name_error}
                  marginTop={8}
                  onTextChanged={(value: string) => {
                    this.setState({first_name: value});
                  }}
                />

                <TextView
                  text={'LAST NAME'}
                  marginTop={24}
                  marginStart={8}
                  textSize={12}
                />
                <EditText
                  text={this.state.last_name}
                  error={this.state.last_name_error}
                  hint={R.string.completeProfileLastNameHint}
                  marginTop={8}
                  onTextChanged={(value: string) => {
                    this.setState({last_name: value});
                  }}
                />

                <TextView
                  text={'PHONE NUMBER'}
                  marginTop={24}
                  marginStart={8}
                  textSize={12}
                />
                <EditText
                  text={this.state.phone}
                  drawableLeft={
                    this.state.country === 'US'
                      ? R.drawable.ic_flag_us
                      : R.drawable.ic_flag_in
                  }
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

                <CountryPicker
                  show={this.state.country_picker}
                  pickerButtonOnPress={item => {
                    this.setState({country_picker: false, country: item.code});
                  }}
                  lang="en"
                  showOnly={['US', 'IN']}
                  style={{}}
                />
              </Padding>

              <Center>
                <Row>
                  <GradiantButton
                    text="  Skip  "
                    marginTop={32}
                    marginEnd={32}
                    textColor={'#7A47FF'}
                    onClick={() => {
                      this.navigation.replace(R.id.home_screen, {});
                    }}
                    paddingStart={8}
                    marginBottom={16}
                    paddingEnd={8}
                    textStyle={'bold'}
                    colors={['#dfd6f5', '#dfd6f5']}
                  />
                  <GradiantButton
                    text="Continue"
                    marginStart={32}
                    marginTop={32}
                    onClick={() => {
                      const first_name = this.state.first_name;
                      const last_name = this.state.last_name;
                      const phone = this.state.phone;
                      if (this.is_form_valid()) {
                        this.update_profile(
                          first_name,
                          last_name,
                          phone,
                          this.state.avatar,
                        );
                      }
                    }}
                    paddingStart={8}
                    marginBottom={16}
                    paddingEnd={8}
                    textStyle={'bold'}
                    colors={[R.color.colorAccent, R.color.colorAccent]}
                  />
                </Row>
              </Center>
            </GradiantContainer>
          </Center>
        </ScrollView>
      </Scaffold>
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

  update_profile(
    first_name: string,
    last_name: string,
    phone: string,
    avatar: string | undefined,
  ) {
    this.lifecycleScope<void>(async () => {
      let profile = await Api.account_profile_update(
        first_name,
        last_name,
        phone,
        avatar,
      );
      await Prefs.setProfile(profile);
    }, true)
      .then((_: void) => {
        this.navigation.replace(R.id.home_screen, {});
      })
      .catch((error: BaseException) => {
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  open_photo_picker() {
    Logger.info(this, 'open image picker');
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
