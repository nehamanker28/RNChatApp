/**
 * Holds constant for various kind of resources.
 * Inspired by android resources management.
 * Access them staticly using R.
 */
import {Drawables} from './res/drawable';
import {Raws} from './res/raw';

const Strings = {
  appName: 'Askim',
  apiHost: 'https://dev.api.mobileinspirations.io:5000/v1',
  splashScreenText:
    'We’ll Let You Connect With Your Favourite Celebrity Instant',
  loginScreenTitle: 'WELCOME BACK!',
  loginScreenSubTitle: 'Log in to your account',
  loginScreenEmailHint: 'Enter your mail',
  loginScreenPasswordHint: 'Enter your Password',
  loginScreenInvalidCredentials: 'Email or Password invalid.',
  createPasswordHint: 'Enter your password',
  createPasswordConfirmHint: 'Confirm Password',
  resetPasswordTitle: 'Reset your password',
  resetPasswordSummary:
    'Enter your email for the verification process, we will send 4 digit code to your email.',
  redirectLoginTitle: 'Log in Successful !',
  redirectLoginSummary: 'Please wait...\nYou will be directed to the homepage',
  redirectSignupTitle: 'Sign up Successful !',
  redirectSignupSummary: 'Please wait...\nYou will be directed to the login',
  redirectResetPasswordTitle: 'Reset Password Successful !',
  redirectResetPasswordSummary:
    'Please wait...\nYou will be directed to the login',
  redirectErrorTitle: 'Error Occurred!',
  redirectErrorSummary:
    'Could not complete last action.\nYou will be directed to the login',
  validationTitle: 'Enter 4 Digits Code',
  validationSummary: 'Enter the 4 digits code that you received on your email.',
  createPasswordTitle: 'Create New Password',
  changePasswordTitle: 'Change Password',
  passwordChangedSuccessfully: 'Password changed successfully!',
  PleaseRelogin: 'Please log in to your account again',
  signupTitle: 'HELLO THERE!',
  signupSummary: 'Please enter your email & password\nto create an account',
  signupEmailHint: 'Enter your mail',
  signupPasswordHint: 'Enter your Password',
  signupConfirmPasswordHint: 'Enter your Password',
  completeProfileTitle: 'COMPLETE YOUR PROFILE',
  completeProfileSummary: 'Please enter your profile',
  completeProfileFirstNameHint: 'eg. joe',
  completeProfileLastNameHint: 'eg. craign',
  completeProfilePhoneNumberHint: '111 467 378 39',
  editProfileFirstNameHint: 'eg. joe',
  editProfileLastNameHint: 'eg. craign',
  editProfileStreetAddressHint: 'eg. regent st.',
  otpValidationError: 'Invalid otp given, please try again.',
  homeTitle: 'ASK ME ANYTHING',
  homeAskHint: 'Type here',
  chatAskHint: 'Ask me anything...',
  instagramUrl: 'https://www.instagram.com/kimkardashian/',
  googleUrl: 'https://www.google.com/search?q=Kim+Kardashian',
  facebookUrl: 'https://www.facebook.com/KimKardashian/',
  twitterUrl: 'https://twitter.com/KimKardashian/',
};

const Colors = {
  colorPrimary: '#FFFFFF',
  colorAccent: '#7A47FF',
  activityIndicator: '#000000',
  grey: '#EAEAEA',
  light_grey :'#FAF9F9',
  text_grey:'#858585',
  settingSectionText: '#909090',
  settingMenuText: '#625D5D',
  settingLogoutText: '#F15050',
  hintColor: '#A5A5A5',
  dividerColor: '#A5A5A5',
  transparent: '#00000000',
  textColorLink: '#4C93FD',
  textColorLinkDark: '#4074F9',
  postLoginTitleColor: '#2A29CC',
  otpInputBox: '#FF7497',
  chat_right_color: '#7A47FF',
  chat_left_color: '#F2F2F2',
  chat_right_text: '#FFFFFF',
  chat_left_text: '#000000',
  error_text: '#DD1010',
  grey_light: '#E0E0E0',
  chatInputBackgroud: '#F5F5F5',
  chatInputRecordingText: '#A5A3A3',
  chatInputMicActive: '#D9D9D9',
  switch_purple: '#7F49FC',
};

const Dimens = {
  logoTopMargin: 32,
  logoBottomMargin: 48,
  splashNestedDelay: 1000,
  redirectNestedDelay: 3000,
  otpDigitCount: 4,
};

const Ids = {
  chat_screen: 'chat_screen',
  history_screen: 'history_screen',
  home_screen: 'home_screen',
  login_screen: 'login_screen',
  password_create_screen: 'password_create_screen',
  password_forgot_screen: 'password_forgot_screen',
  payment_method_new_screen: 'payment_method_new_screen',
  payment_method_select_screen: '_payment_method_select_screen_',
  payment_review_screen: 'payment_review_screen',
  payment_success_screen: 'payment_success_screen',
  post_redirect_screen: 'post_redirect_screen',
  profile_complete_screen: 'profile_complete_screen',
  profile_edit_screen: 'profile_edit_screen',
  profile_help_screen: 'profile_help_screen',
  profile_privacy_screen: 'profile_privacy_screen',
  profile_security_screen: 'profile_security_screen',
  profile_succeed_change_password: 'profile_succeed_change_password',
  profile_view_screen: 'profile_view_screen',
  profile_change_password_screen: 'profile_change_password_screen',
  reset_password_validation_screen: 'reset_password_validation_screen',
  signup_screen: 'signup_screen',
  splash_screen: 'splash_screen',
  upgrade_screen: 'upgrade_screen',
  transaction_history_screen: 'transaction_history_screen',
  subscription_screen : 'subscription_screen',
  test_screen: 'test_screen',
  notification_screen: 'notification_screen',
  video_screen: 'video_screen',
};

const Fonts = {
  inter_bold: 'Inter-Bold',
  inter_extra_bold: 'Inter-ExtraBold',
  inter_extra_light: 'Inter-ExtraLight',
  inter_light: 'Inter-Light',
  inter_medium: 'Inter-Medium',
  inter_regular: 'Inter-Regular',
  inter_semi_bold: 'Inter-SemiBold',
  inter_thin: 'Inter-Thin',
};

export class R {
  static color = Colors;
  static string = Strings;
  static dimens = Dimens;
  static drawable = Drawables;
  static id = Ids;
  static raw = Raws;
  static font = Fonts;
}
