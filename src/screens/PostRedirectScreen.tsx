import React from 'react';
import {Scaffold} from '../res/widgets/Scaffold';
import {R} from '../constant';
import {Center} from '../res/widgets/Center';
import {ImageView} from '../res/widgets/ImageView';
import {GradiantContainer} from '../res/widgets/GradiantContainer';
import {Padding} from '../res/widgets/Padding';
import {TextView} from '../res/widgets/TextView';
import {LottieView} from '../res/widgets/LottieView';
import {BaseComponent} from '../commons/BaseComponent';
import {Utils} from '../commons/Utils';
import {BaseException} from '../commons/BaseException';
import Snackbar from 'react-native-snackbar';
import { Api } from '../commons/Api';

export enum PostRedirectAction {
  RESET_TO_LOGIN = 0,
  SIGNUP_TO_LOGIN = 1,
  LOGIN_TO_HOME = 2,
  ERROR_TO_LOGIN = 3,
  SIGNUP_TO_PROFILE = 4,
}

export class PostRedirectScreen extends BaseComponent {
  redirect_action: PostRedirectAction;
  redirect_message: string;
  title: string | undefined;
  summary: string | undefined;

  constructor(props: any) {
    super(props);
    this.redirect_action = this.navigation.arguments.redirect_action;
    this.redirect_message = this.navigation.arguments.redirect_message;
    console.error(this.redirect_action);
    switch (this.redirect_action) {
      case PostRedirectAction.RESET_TO_LOGIN:
        this.title = R.string.redirectResetPasswordTitle;
        this.summary = R.string.redirectResetPasswordSummary;
        break;
      case PostRedirectAction.SIGNUP_TO_LOGIN:
        this.title = R.string.redirectSignupTitle;
        this.summary = R.string.redirectSignupSummary;
        break;
      case PostRedirectAction.LOGIN_TO_HOME:
        this.title = R.string.redirectLoginTitle;
        this.summary = R.string.redirectLoginSummary;
        break;
      case PostRedirectAction.ERROR_TO_LOGIN:
        this.title = R.string.redirectErrorTitle;
        this.summary = R.string.redirectErrorSummary;
        break;
    }
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
                <ImageView
                  src={R.drawable.ic_success}
                  visibility={
                    this.redirect_action !== PostRedirectAction.ERROR_TO_LOGIN
                  }
                  height={64}
                  marginTop={24}
                  marginBottom={24}
                />
                <TextView
                  text={this.title}
                  textColor={R.color.postLoginTitleColor}
                  textStyle={'bold'}
                  textSize={18}
                />
                <TextView
                  text={this.summary}
                  marginTop={32}
                  textSize={12}
                  gravity={'center'}
                  marginStart={32}
                  marginEnd={32}
                  textColor={'grey'}
                />
                <LottieView
                  lottieRawRes={R.raw.progress_bar}
                  marginTop={32}
                  marginBottom={16}
                  width={48}
                />
              </Center>
            </Padding>
          </GradiantContainer>
        </Center>
      </Scaffold>
    );
  }

  onViewCreated(): void {
    this.got_to_login_or_home();
    if (this.redirect_action === PostRedirectAction.ERROR_TO_LOGIN) {
      Snackbar.show({
        text: this.redirect_message,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  }

  got_to_login_or_home() {
    this.lifecycleScope<void>(async () => {
      await Api.registerNotificationDevice();
      await Utils.delay(R.dimens.redirectNestedDelay);
    })
      .then((_: any) => {
        switch (this.redirect_action) {
          case PostRedirectAction.RESET_TO_LOGIN:
            // go to login
            this.navigation.replace(R.id.login_screen, {});
            break;
          case PostRedirectAction.SIGNUP_TO_LOGIN:
            // go to home
            this.navigation.replace(R.id.login_screen, {});
            break;
          case PostRedirectAction.LOGIN_TO_HOME:
            // go to home
            this.navigation.replace(R.id.home_screen, {});
            break;
          case PostRedirectAction.ERROR_TO_LOGIN:
            // go to home
            this.navigation.replace(R.id.login_screen, {});
            break;
        }
      })
      .catch((_: BaseException) => {
        // unlikey error
      });
  }
}
