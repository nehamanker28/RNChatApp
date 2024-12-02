/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {R} from '../constant';
import {TextView} from '../res/widgets/TextView';
import {Scaffold} from '../res/widgets/Scaffold';
import {Center} from '../res/widgets/Center';
import {ImageView} from '../res/widgets/ImageView';
import {GradiantButton} from '../res/widgets/GradiantButton';
import {BaseComponent} from '../commons/BaseComponent';
import {Prefs} from '../commons/Prefs';
import {Utils} from '../commons/Utils';
import {ActivityIndicator} from 'react-native';

export class SplashScreenComponent extends BaseComponent {
  state: {actionButtonVisibility: boolean};

  constructor(props: any) {
    super(props);
    this.state = {...super.state, ...{actionButtonVisibility: false}};
  }

  onCreateView() {
    return (
      <Scaffold
        headerImage={R.drawable.splash_top_vector}
        footerImage={R.drawable.splash_bottom_vector}>
        <Center>
          <ImageView src={R.drawable.askim_logo} height={80} />
          <TextView
            marginTop={32}
            marginBottom={32}
            marginStart={32}
            marginEnd={32}
            gravity="center"
            textSize={18}
            text={R.string.splashScreenText}
          />
          <ImageView src={R.drawable.splash_center_image} height={200} />
          {this.state.actionButtonVisibility ? (
            <GradiantButton
              text="LET ME IN"
              borderRadius={4}
              fontSize={12}
              marginTop={32}
              onClick={() => {
                this.navigation.replace(R.id.login_screen, {});
              }}
            />
          ) : (
            <ActivityIndicator
              style={{marginTop: 32}}
              size="small"
              color={R.color.activityIndicator}
            />
          )}
        </Center>
      </Scaffold>
    );
  }
  onViewCreated(): void {
    this.go_home_or_login_action();
  }

  go_home_or_login_action() {
    this.lifecycleScope<boolean>(async () => {
      // return true if logged in
      await Utils.delay(R.dimens.splashNestedDelay);
      return (await Prefs.getBearerToken()) !== null;
    })
      .then((result: any) => {
        if (result) {
          // go to home
          this.navigation.replace(R.id.home_screen, {});
          // this.navigation.replace(R.id.chat_screen, {});
        } else {
          // enable login action button
          this.setState({actionButtonVisibility: true});
        }
      })
      .catch((_: any) => {
        // most likely no error here
      });
  }
}

export function SplashScreen(props: any): JSX.Element {
  return <SplashScreenComponent {...props} />;
}
