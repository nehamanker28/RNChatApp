import React from 'react';
import {Scaffold} from '../res/widgets/Scaffold';
import {R} from '../constant';
import {Center} from '../res/widgets/Center';
import {ImageView} from '../res/widgets/ImageView';
import {TextView} from '../res/widgets/TextView';
import {BaseComponent} from '../commons/BaseComponent';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {GradiantContainer} from '../res/widgets/GradiantContainer';
import {Padding} from '../res/widgets/Padding';
import {Row} from '../res/widgets/Row';
import {EditText} from '../res/widgets/EditText';
import {Utils} from '../commons/Utils';
import Snackbar from 'react-native-snackbar';
import {Api} from '../commons/Api';
import {BaseException} from '../commons/BaseException';
import {PostRedirectAction} from './PostRedirectScreen';

export class PasswordCreateScreen extends BaseComponent {
  email: string;
  token: string;

  state: {
    password: string;
    confirm_password: string;
    password_error: string;
    confirm_password_error: string;
  };

  constructor(props: any) {
    super(props);
    this.email = this.navigation.arguments.email;
    this.token = this.navigation.arguments.token;
    this.state = {
      ...super.state,
      ...{
        password: '',
        confirm_password: '',
        password_error: '',
        confirm_password_error: '',
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
                  text={R.string.createPasswordTitle}
                  textColor={'black'}
                  textSize={18}
                />
              </Center>
              <TextView
                text={'NEW PASSWORD'}
                marginTop={32}
                marginStart={8}
                textSize={12}
              />
              <EditText
                hint={R.string.createPasswordHint}
                marginTop={8}
                inputType="textPassword"
                error={this.state.password_error}
                onTextChanged={(value: string) => {
                  this.setState({password: value});
                }}
              />

              <TextView
                text={'CONFIRM NEW PASSWORD'}
                marginTop={24}
                marginStart={8}
                textSize={12}
              />
              <EditText
                hint={R.string.createPasswordConfirmHint}
                marginTop={8}
                inputType="textPassword"
                error={this.state.confirm_password_error}
                onTextChanged={(value: string) => {
                  this.setState({confirm_password: value});
                }}
              />
              <Center>
                <GradiantButton
                  marginTop={40}
                  text="Reset Password"
                  textStyle={'bold'}
                  marginBottom={16}
                  colors={[R.color.colorAccent, R.color.colorAccent]}
                  onClick={() => {
                    if (this.is_form_valid()) {
                      this.call_reset_password_and_go_to_post_redirect_or_forgot_password(
                        this.email,
                        this.state.password,
                        this.token,
                      );
                    }
                  }}
                />
              </Center>
            </Padding>
          </GradiantContainer>
          <Padding paddingTop={8} paddingBottom={8}>
            <Row>
              <ImageView src={R.drawable.ic_back} height={16} width={16} />
              <Center>
                <TextView
                  text="Back"
                  marginStart={6}
                  textSize={12}
                  onClick={() => {
                    this.navigation.replace(R.id.password_forgot_screen, {});
                  }}
                />
              </Center>
            </Row>
          </Padding>
        </Center>
      </Scaffold>
    );
  }
  onViewCreated(): void {}

  is_form_valid(): boolean {
    this.setState({password_error: '', confirm_password_error: ''});
    if (!Utils.isPasswordCriteriaValid(this.state.password)) {
      this.setState({
        password_error: 'Password must be 8 or more charter long',
      });
    } else if (this.state.password !== this.state.confirm_password) {
      this.setState({
        confirm_password_error: 'Confirm password does not match.',
      });
    } else {
      return true;
    }
    return false;
  }

  call_reset_password_and_go_to_post_redirect_or_forgot_password(
    email: string,
    password: string,
    token: string,
  ) {
    this.lifecycleScope<void>(async () => {
      await Api.account_password_reset(email, password, token);
    }, true)
      .then((_: any) => {
        // go to redirect screen
        this.navigation.replace(R.id.post_redirect_screen, {
          redirect_action: PostRedirectAction.RESET_TO_LOGIN,
        });
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
