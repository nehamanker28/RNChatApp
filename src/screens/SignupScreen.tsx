/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Scaffold} from '../res/widgets/Scaffold';
import {R} from '../constant';
import {Center} from '../res/widgets/Center';
import {ImageView} from '../res/widgets/ImageView';
import {BaseComponent} from '../commons/BaseComponent';
import {EditText} from '../res/widgets/EditText';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {GradiantContainer} from '../res/widgets/GradiantContainer';
import {Padding} from '../res/widgets/Padding';
import {Row} from '../res/widgets/Row';
import {TextView} from '../res/widgets/TextView';
import {Divider} from '../res/widgets/Divider';
import {ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Snackbar from 'react-native-snackbar';
import {Utils} from '../commons/Utils';
import {Api} from '../commons/Api';
import {BaseException} from '../commons/BaseException';
import {PostRedirectAction} from './PostRedirectScreen';

export class SignupScreen extends BaseComponent {
  state: {
    email: string;
    password: string;
    confirm_password: string;
    email_error: string;
    password_error: string;
    confirm_password_error: string;
    term_condition_checked: boolean;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      ...super.state,
      ...{
        email: '',
        password: '',
        confirm_password: '',
        email_error: '',
        password_error: '',
        confirm_password_error: '',
        term_condition_checked: false,
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
                    text={R.string.signupTitle}
                    textColor={'black'}
                    textSize={16}
                  />
                  <TextView
                    text={R.string.signupSummary}
                    marginTop={8}
                    textSize={12}
                    gravity={'center'}
                    marginStart={32}
                    marginEnd={32}
                    textColor={'grey'}
                  />
                </Center>
                <TextView
                  text={'EMAIL'}
                  marginTop={24}
                  marginStart={8}
                  textSize={12}
                />
                <EditText
                  hint={R.string.signupEmailHint}
                  marginTop={8}
                  error={this.state.email_error}
                  text={this.state.email}
                  onTextChanged={(value: string) =>
                    this.setState({email: value})
                  }
                />

                <TextView
                  text={'PASSWORD'}
                  marginTop={24}
                  marginStart={8}
                  textSize={12}
                />
                <EditText
                  hint={R.string.signupPasswordHint}
                  marginTop={8}
                  text={this.state.password}
                  error={this.state.password_error}
                  inputType="textPassword"
                  onTextChanged={(value: string) =>
                    this.setState({password: value})
                  }
                />

                <TextView
                  text={'CONFIRM PASSWORD'}
                  marginTop={24}
                  marginStart={8}
                  textSize={12}
                />
                <EditText
                  hint={R.string.signupConfirmPasswordHint}
                  marginTop={8}
                  text={this.state.confirm_password}
                  error={this.state.confirm_password_error}
                  inputType="textPassword"
                  onTextChanged={(value: string) =>
                    this.setState({confirm_password: value})
                  }
                />

                <Padding paddingEnd={4} paddingTop={12}>
                  <Row>
                    <CheckBox
                      style={{
                        height: 16,
                        width: 16,
                        marginTop: 2,
                      }}
                      disabled={false}
                      value={this.state.term_condition_checked}
                      boxType="square"
                      tintColor={R.color.grey}
                      onCheckColor={R.color.colorAccent}
                      onTintColor={R.color.colorAccent}
                      tintColors={{
                        false: R.color.grey,
                        true: R.color.colorAccent,
                      }}
                      onValueChange={(value: boolean) => {
                        this.setState({term_condition_checked: value});
                      }}
                    />
                    <TextView
                      text={
                        'I agree to askim Public agreement terms & Privacy Policy.'
                      }
                      marginStart={12}
                      textSize={12}
                    />
                  </Row>
                </Padding>

                <Divider height={0.4} marginTop={32} />
              </Padding>
              <Center>
                <Row>
                  <TextView
                    text={'Already have an Account?'}
                    marginTop={4}
                    marginStart={8}
                    textSize={13}
                  />
                  <TextView
                    text={'Log In'}
                    textColor={R.color.textColorLinkDark}
                    marginTop={4}
                    marginStart={8}
                    textSize={13}
                    onClick={() =>
                      this.navigation.replace(R.id.login_screen, {})
                    }
                  />
                </Row>
                <Padding paddingTop={4}>
                  <Row>
                    <Divider height={0.4} marginTop={32} width={100} />
                    <TextView
                      text={'Or Continue with'}
                      textSize={12}
                      marginStart={8}
                      marginEnd={8}
                      marginTop={24}
                    />
                    <Divider height={0.4} marginTop={32} width={100} />
                  </Row>
                </Padding>
                <ImageView
                  src={R.drawable.placeholder_social_login}
                  marginTop={24}
                  height={28}
                />
              </Center>
              <Center>
                <GradiantButton
                  text="Continue"
                  marginTop={32}
                  onClick={() => {
                    if (this.is_form_valid()) {
                      this.call_register_and_goto_signup_validation(
                        this.state.email,
                        this.state.password,
                      );
                    }
                  }}
                  paddingStart={8}
                  marginBottom={16}
                  paddingEnd={8}
                  textStyle={'bold'}
                  colors={[R.color.colorAccent, R.color.colorAccent]}
                />
              </Center>
            </GradiantContainer>
          </Center>
        </ScrollView>
      </Scaffold>
    );
  }
  onViewCreated(): void {}

  resetState() {
    this.setState({
      email: '',
      password: '',
      confirm_password: '',
      email_error: '',
      password_error: '',
      confirm_password_error: '',
      term_condition_checked: false,
    });
  }

  is_form_valid(): boolean {
    this.setState({
      email_error: '',
      password_error: '',
      confirm_password_error: '',
    });

    if (!Utils.isEmailValid(this.state.email)) {
      this.setState({
        email_error: 'Please enter valid email address',
      });
    } else if (!Utils.isPasswordCriteriaValid(this.state.password)) {
      this.setState({
        password_error: 'Password must be 8 or more charter long',
      });
    } else if (this.state.password !== this.state.confirm_password) {
      this.setState({
        confirm_password_error: 'Confirm password does not match',
      });
    } else if (!this.state.term_condition_checked) {
      Snackbar.show({
        text: 'Please check term and condition before continue.',
        duration: Snackbar.LENGTH_LONG,
      });
    } else {
      return true;
    }
    return false;
  }

  call_register_and_goto_signup_validation(email: string, password: string) {
    this.lifecycleScope<void>(async () => {
      await Api.account_register(email);
    }, true)
      .then((_: any) => {
        // go to reset password validation
        this.navigation.replace(R.id.reset_password_validation_screen, {
          email: email,
          password: password,
        });
      })
      .catch((error: BaseException) => {
        this.resetState();
        this.showSnackBar(error.message);
      });
  }
}
