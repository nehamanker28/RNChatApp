import React from 'react';
import {Scaffold} from '../res/widgets/Scaffold';
import {R} from '../constant';
import {Center} from '../res/widgets/Center';
import {ImageView} from '../res/widgets/ImageView';
import {TextView} from '../res/widgets/TextView';
import {GradiantContainer} from '../res/widgets/GradiantContainer';
import {EditText} from '../res/widgets/EditText';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {Row} from '../res/widgets/Row';
import {Padding} from '../res/widgets/Padding';
import {BaseComponent} from '../commons/BaseComponent';
import Snackbar from 'react-native-snackbar';
import {Api} from '../commons/Api';
import {BaseException} from '../commons/BaseException';
import {Utils} from '../commons/Utils';

export class PasswordForgotScreen extends BaseComponent {
  state: {email: string; email_error: string};

  constructor(props: any) {
    super(props);
    this.state = {...super.state, ...{email: '', email_error: ''}};
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
                  text={R.string.resetPasswordTitle}
                  textColor={'black'}
                  textSize={18}
                />
                <TextView
                  text={R.string.resetPasswordSummary}
                  marginTop={24}
                  textSize={12}
                  gravity={'center'}
                  marginStart={32}
                  marginEnd={32}
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
                text={this.state.email}
                error={this.state.email_error}
                onTextChanged={(value: string) => {
                  this.setState({email: value, email_error: ''});
                }}
              />
              <Center>
                <GradiantButton
                  marginTop={32}
                  text="Continue"
                  textStyle={'bold'}
                  marginBottom={16}
                  colors={[R.color.colorAccent, R.color.colorAccent]}
                  onClick={() => {
                    if (this.is_form_valid()) {
                      let email = this.state.email.trim();
                      this.call_forgot_password_and_go_to_password_validation(
                        email,
                      );
                    }
                  }}
                />
              </Center>
            </Padding>
          </GradiantContainer>
          <Padding paddingTop={8} paddingBottom={8}>
            <Row gravity={'center'}>
              <ImageView src={R.drawable.ic_back} height={16} width={16} />
              <Center>
                <TextView
                  text="Back to Log In"
                  marginStart={6}
                  textSize={12}
                  onClick={() => {
                    this.navigation.replace(R.id.login_screen, {});
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
    this.setState({email_error: ''});
    if (!Utils.isEmailValid(this.state.email)) {
      this.setState({email_error: 'Please enter valid email address'});
    } else {
      return true;
    }
    return false;
  }

  call_forgot_password_and_go_to_password_validation(email: string) {
    this.lifecycleScope<void>(async () => {
      await Api.account_password_forgot(email);
    }, true)
      .then((_: any) => {
        // go to password validation
        this.navigation.replace(R.id.reset_password_validation_screen, {
          email: email,
        });
      })
      .catch((error: BaseException) => {
        this.setState({email_error: error.message});
      });
  }
}
