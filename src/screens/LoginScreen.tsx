/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Scaffold} from '../res/widgets/Scaffold';
import {Center} from '../res/widgets/Center';
import {ImageView} from '../res/widgets/ImageView';
import {EditText} from '../res/widgets/EditText';
import {GradiantContainer} from '../res/widgets/GradiantContainer';
import {TextView} from '../res/widgets/TextView';
import {Divider} from '../res/widgets/Divider';
import {ScrollView} from 'react-native';
import {Row} from '../res/widgets/Row';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {Padding} from '../res/widgets/Padding';
import {R} from '../constant';
import {BaseComponent} from '../commons/BaseComponent';
import {Api} from '../commons/Api';
import {Prefs} from '../commons/Prefs';
import {Utils} from '../commons/Utils';
import {BaseException} from '../commons/BaseException';
import {PostRedirectAction} from './PostRedirectScreen';
import {Snackbar} from 'react-native-paper';

export class LoginScreen extends BaseComponent {
  state: {
    email: string;
    password: string;
    email_error: string;
    password_error: string;
    login_error: string | null;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      ...super.state,
      ...{
        email: '',
        password: '',
        loading: false,
        email_error: '',
        password_error: '',
        login_error: null,
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
              height={72}
              marginTop={12}
              marginBottom={12}
            />
            <GradiantContainer
              marginTop={16}
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
                    text={R.string.loginScreenTitle}
                    textColor={'black'}
                    textSize={17}
                  />
                  <TextView
                    text={R.string.loginScreenSubTitle}
                    marginTop={8}
                    textSize={17}
                    textColor={'grey'}
                  />
                </Center>

                <TextView
                  text={'EMAIL'}
                  marginTop={32}
                  marginStart={8}
                  textSize={12}
                />
                <EditText
                  hint={R.string.loginScreenEmailHint}
                  marginTop={8}
                  error={this.state.email_error}
                  text={this.state.email}
                  onTextChanged={(value: string) => {
                    this.setState({email: value});
                  }}
                />
                <TextView
                  text={'PASSWORD'}
                  marginTop={24}
                  marginStart={8}
                  textSize={12}
                />
                <EditText
                  hint={R.string.loginScreenPasswordHint}
                  marginTop={8}
                  error={this.state.password_error}
                  inputType="textPassword"
                  text={this.state.password}
                  onTextChanged={(value: string) => {
                    this.setState({password: value});
                  }}
                />
                <Divider height={0.4} marginTop={32} />
              </Padding>
              <Center>
                <TextView
                  text={'Forgot Password?'}
                  textColor={R.color.textColorLink}
                  marginStart={8}
                  textSize={14}
                  onClick={() => {
                    this.navigation.replace(R.id.password_forgot_screen, {});
                  }}
                />
                <Row>
                  <TextView
                    text={"Don't have an Account?"}
                    marginTop={24}
                    marginStart={8}
                    textSize={13}
                  />
                  <TextView
                    text={'Sign Up'}
                    textColor={R.color.textColorLinkDark}
                    marginTop={24}
                    marginStart={8}
                    textSize={13}
                    onClick={() => this.navigation.push(R.id.signup_screen, {})}
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
                  text="Log In"
                  marginTop={32}
                  onClick={() => {
                    if (this.is_form_valid()) {
                      this.call_login_or_error_or_profile(
                        this.state.email.trim(),
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
        <Snackbar
          action={{
            label: 'Dismiss',
            onPress: () => {
              this.setState({login_error: null});
            },
          }}
          visible={this.state.login_error !== null}
          onDismiss={() => {}}>
          {this.state.login_error}
        </Snackbar>
      </Scaffold>
    );
  }
  onViewCreated(): void {}

  showLoginError(error: string) {
    this.setState({login_error: error});
    this.lifecycleScope<void>(async () => {
      await Utils.delay(3000);
    })
      .then((_: void) => {
        this.setState({login_error: null});
      })
      .catch((_: BaseException) => {});
  }

  is_form_valid(): boolean {
    this.setState({email_error: '', password_error: ''});
    if (!Utils.isEmailValid(this.state.email)) {
      this.setState({email_error: 'Please enter valid email address'});
    } else if (!Utils.isPasswordCriteriaValid(this.state.password)) {
      this.setState({password_error: 'Please enter valid password'});
    } else {
      return true;
    }
    return false;
  }

  call_login_or_error_or_profile(email: string, password: string) {
    this.lifecycleScope<void>(async () => {
      let token = await Api.account_login(email, password);
      await Prefs.setBearerToken(token);
      let profile = await Api.account_profile_read();
      await Prefs.setProfile(profile);
    }, true)
      .then((_: void) => {
        // go to redirect
        this.navigation.replace(R.id.post_redirect_screen, {
          redirect_action: PostRedirectAction.LOGIN_TO_HOME,
        });
      })
      .catch((error: BaseException) => {
        this.setState({password: ''});
        this.showLoginError(error.message);
      });
  }
}
