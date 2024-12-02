/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Scaffold} from '../res/widgets/Scaffold';
import {BaseComponent} from '../commons/BaseComponent';
import {R} from '../constant';
import {Center} from '../res/widgets/Center';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {GradiantContainer} from '../res/widgets/GradiantContainer';
import {ImageView} from '../res/widgets/ImageView';
import {Padding} from '../res/widgets/Padding';
import {Row} from '../res/widgets/Row';
import {TextView} from '../res/widgets/TextView';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Snackbar from 'react-native-snackbar';
import {Api} from '../commons/Api';
import {BaseException} from '../commons/BaseException';
import {Utils} from '../commons/Utils';
import {Prefs} from '../commons/Prefs';
import {PostRedirectAction} from './PostRedirectScreen';

export class ResetPasswordValidationScreen extends BaseComponent {
  email: string;
  password: string | undefined;

  state: {
    otp: string;
    invalid_otp: boolean;
    resend_count: number;
  };

  constructor(props: any) {
    super(props);
    this.email = this.navigation.arguments.email;
    this.password = this.navigation.arguments.password;
    this.state = {
      ...super.state,
      ...{
        otp: '',
        invalid_otp: false,
        resend_count: 60,
      },
    };
  }

  onCreateView() {
    return (
      <Scaffold footerImage={R.drawable.splash_bottom_vector}>
        <Center>
          <ImageView
            src={R.drawable.askim_logo}
            height={72}
            marginTop={R.dimens.logoTopMargin}
            marginBottom={R.dimens.logoBottomMargin}
          />
          <GradiantContainer marginStart={32} marginEnd={32} marginBottom={16}>
            <Padding
              paddingTop={20}
              paddingStart={16}
              paddingEnd={16}
              paddingBottom={20}>
              <Center>
                <TextView
                  text={R.string.validationTitle}
                  textColor={'black'}
                  textSize={18}
                />
                <TextView
                  text={R.string.validationSummary}
                  marginTop={12}
                  textSize={12}
                  gravity={'center'}
                  marginStart={32}
                  marginEnd={32}
                  textColor={'grey'}
                />
              </Center>

              <Center>
                <OTPInputView
                  style={{
                    width: '90%',
                    height: 100,
                  }}
                  autoFocusOnLoad={false}
                  code={this.state.otp}
                  pinCount={R.dimens.otpDigitCount}
                  codeInputFieldStyle={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderColor: R.color.otpInputBox,
                    borderRadius: 8,
                    color: 'black',
                  }}
                  onCodeChanged={(value: string) => {
                    this.setState({otp: value});
                  }}
                  onCodeFilled={_ => {
                    // do nothing
                  }}
                />

                <TextView
                  text={R.string.otpValidationError}
                  visibility={this.state.invalid_otp}
                  textSize={12}
                  marginBottom={12}
                  onClick={() => {
                    if (this.state.resend_count === 0) {
                      this.call_forgot_password(this.email);
                    }
                  }}
                  textColor={R.color.error_text}
                />

                <TextView
                  text={'Resend Code'}
                  textSize={12}
                  onClick={() => {
                    if (this.state.resend_count === 0) {
                      this.call_forgot_password(this.email);
                    }
                  }}
                  textColor={
                    this.state.resend_count === 0
                      ? R.color.colorAccent
                      : R.color.grey
                  }
                />

                <TextView
                  text={`You can resend code in ${this.state.resend_count} s`}
                  marginTop={16}
                  marginStart={8}
                  textSize={12}
                  textColor={'black'}
                />

                <GradiantButton
                  marginTop={32}
                  text="Continue"
                  textStyle={'bold'}
                  marginBottom={16}
                  colors={[R.color.colorAccent, R.color.colorAccent]}
                  onClick={() => {
                    if (this.state.otp.length === R.dimens.otpDigitCount) {
                      this.call_password_token(this.email, this.state.otp);
                    } else {
                      Snackbar.show({
                        text: 'Please enter valid otp before continue.',
                        duration: Snackbar.LENGTH_LONG,
                      });
                    }
                  }}
                />
              </Center>
            </Padding>
          </GradiantContainer>
          <Padding paddingTop={8} paddingBottom={8}>
            <Row gravity={'center'}>
              <ImageView src={R.drawable.ic_back} height={16} width={16} />
              <TextView
                text="Back"
                marginStart={6}
                textSize={12}
                onClick={() => {
                  this.goBack();
                }}
              />
            </Row>
          </Padding>
        </Center>
      </Scaffold>
    );
  }
  onViewCreated(): void {
    this.start_resend_counter();
  }

  goBack() {
    if (this.password !== undefined) {
      this.navigation.replace(R.id.signup_screen, {});
    } else {
      this.navigation.replace(R.id.password_forgot_screen, {});
    }
  }

  start_resend_counter() {
    this.setState({resend_count: 60});
    this.lifecycleScope<void>(async () => {
      let count = this.state.resend_count;
      while (this.state.resend_count !== 0) {
        this.setState({resend_count: count--});
        await Utils.delay(1000);
      }
    }, false)
      .then((_: any) => {
        // do nothing
      })
      .catch((_: BaseException) => {
        // do nothing
      });
  }

  call_password_token(email: string, otp: string) {
    this.lifecycleScope<string>(async () => {
      return await Api.account_password_token(email, otp);
    }, true)
      .then((token: any) => {
        if (this.password === undefined) {
          // navigate to password create
          this.navigation.replace(R.id.password_create_screen, {
            email: this.email,
            token: token,
          });
        } else {
          // reset password | login | redirect to post signup
          this.call_reset_password_and_go_to_post_redirect(
            this.email,
            this.password,
            token,
          );
        }
      })
      .catch((_: BaseException) => {
        this.setState({otp: '', invalid_otp: true});
      });
  }

  call_forgot_password(email: string) {
    this.lifecycleScope<void>(async () => {
      await Api.account_password_forgot(email);
    }, true)
      .then((_: any) => {
        // start counter
        this.start_resend_counter();
      })
      .catch((error: BaseException) => {
        Snackbar.show({
          text: error.message,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }

  call_reset_password_and_go_to_post_redirect(
    email: string,
    password: string,
    token: string,
  ) {
    this.lifecycleScope<void>(async () => {
      await Api.account_password_reset(email, password, token);
      let bearer_token = await Api.account_login(email, password);
      await Prefs.setBearerToken(bearer_token);
      let profile = await Api.account_profile_read();
      await Prefs.setProfile(profile);
    }, true)
      .then((_: any) => {
        // go to redirect screen
        this.navigation.replace(R.id.profile_complete_screen, {});
      })
      .catch((_: BaseException) => {
        // show error first and go back todo
        this.navigation.replace(R.id.post_redirect_screen, {
          redirect_action: PostRedirectAction.ERROR_TO_LOGIN,
          redirect_message: 'Invalid OTP given. Please try again.',
        });
      });
  }
}
