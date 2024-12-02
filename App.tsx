import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/screens/HomeScreen';
import {R} from './src/constant';
import {SplashScreen} from './src/screens/SplashScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import {ChatScreen} from './src/screens/ChatScreen';
import {HistoryScreen} from './src/screens/HistoryScreen';
import {PasswordCreateScreen} from './src/screens/PasswordCreateScreen';
import {PasswordForgotScreen} from './src/screens/PasswordForgotScreen';
import {PaymentMethodNewScreen} from './src/screens/PaymentMethodNewScreen';
import {PaymentMethodSelectScreen} from './src/screens/PaymentMethodSelectScreen';
import {PaymentReviewScreen} from './src/screens/PaymentReviewScreen';
import {PaymentSuccessScreen} from './src/screens/PaymentSuccessScreen';
import {PostRedirectScreen} from './src/screens/PostRedirectScreen';
import {ProfileCompleteScreen} from './src/screens/ProfileCompleteScreen';
import {ProfileEditScreen} from './src/screens/ProfileEditScreen';
import {ProfileHelpScreen} from './src/screens/ProfileHelpScreen';
import {ProfilePrivacyScreen} from './src/screens/ProfilePrivacyScreen';
import {ProfileSecurityScreen} from './src/screens/ProfileSecurityScreen';
import {ProfileChangePassword} from './src/screens/ProfileChangePassword';
import {ProfileSucceedChangePassword} from './src/screens/ProfileSuccedChangePassword';
import {ProfileViewScreen} from './src/screens/ProfileViewScreen';
import {SignupScreen} from './src/screens/SignupScreen';
import {UpgradeScreen} from './src/screens/UpgradeScreen';
import {ResetPasswordValidationScreen} from './src/screens/ResetPasswordValidationScreen';
import {navigationRef} from './src/navigator';
import {Repository} from './src/commons/Repository';
import {Message} from './src/models/message';
import {createRealmContext} from '@realm/react';
import {TestScreen} from './src/screens/TestScreen';
import {UlDl} from './src/models/uldl';
import {Attachment} from './src/models/attachment';
import {Notification} from './src/screens/NotificationScreen/Notification';
import {TransactionHistory} from './src/screens/Transaction/TransactionHistory';
import {Subscription} from './src/screens/Subscription/MySubscriptionScreen';
import {VideoScreen} from './src/screens/VideoScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';

import messaging from '@react-native-firebase/messaging';

export const RealmContext = createRealmContext({
  schema: [Message, UlDl, Attachment],
  schemaVersion: 2,
  deleteRealmIfMigrationNeeded: true,
});
const Stack = createNativeStackNavigator();
const {useRealm} = RealmContext;

export function App(): JSX.Element {
  const {RealmProvider} = RealmContext;

  messaging().requestPermission();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RealmProvider>
        <NavigationContainerStack />
      </RealmProvider>
    </GestureHandlerRootView>
  );
}

export function NavigationContainerStack(): JSX.Element {
  // initialize global names
  global.repository = new Repository(useRealm());

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={R.id.splash_screen}
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
          contentStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Stack.Screen name={R.id.chat_screen} component={ChatScreen} />
        <Stack.Screen name={R.id.history_screen} component={HistoryScreen} />
        <Stack.Screen name={R.id.home_screen} component={HomeScreen} />
        <Stack.Screen name={R.id.login_screen} component={LoginScreen} />
        <Stack.Screen
          name={R.id.password_create_screen}
          component={PasswordCreateScreen}
        />
        <Stack.Screen
          name={R.id.password_forgot_screen}
          component={PasswordForgotScreen}
        />
        <Stack.Screen
          name={R.id.payment_method_new_screen}
          component={PaymentMethodNewScreen}
        />
        <Stack.Screen
          name={R.id.payment_method_select_screen}
          component={PaymentMethodSelectScreen}
        />
        <Stack.Screen
          name={R.id.payment_review_screen}
          component={PaymentReviewScreen}
        />
        <Stack.Screen
          name={R.id.payment_success_screen}
          component={PaymentSuccessScreen}
        />
        <Stack.Screen
          name={R.id.post_redirect_screen}
          component={PostRedirectScreen}
        />
        <Stack.Screen
          name={R.id.profile_complete_screen}
          component={ProfileCompleteScreen}
        />
        <Stack.Screen
          name={R.id.profile_edit_screen}
          component={ProfileEditScreen}
        />
        <Stack.Screen
          name={R.id.profile_help_screen}
          component={ProfileHelpScreen}
        />
        <Stack.Screen
          name={R.id.profile_privacy_screen}
          component={ProfilePrivacyScreen}
        />
        <Stack.Screen
          name={R.id.profile_security_screen}
          component={ProfileSecurityScreen}
        />
        <Stack.Screen
          name={R.id.profile_succeed_change_password}
          component={ProfileSucceedChangePassword}
        />
        <Stack.Screen
          name={R.id.profile_change_password_screen}
          component={ProfileChangePassword}
        />
        <Stack.Screen
          name={R.id.profile_view_screen}
          component={ProfileViewScreen}
        />
        <Stack.Screen
          name={R.id.reset_password_validation_screen}
          component={ResetPasswordValidationScreen}
        />
        <Stack.Screen
          name={R.id.notification_screen}
          component={Notification}
        />
        <Stack.Screen
          name={R.id.transaction_history_screen}
          component={TransactionHistory}
        />
        <Stack.Screen
          name={R.id.subscription_screen}
          component={Subscription}
        />
        <Stack.Screen name={R.id.signup_screen} component={SignupScreen} />
        <Stack.Screen name={R.id.splash_screen} component={SplashScreen} />
        <Stack.Screen name={R.id.upgrade_screen} component={UpgradeScreen} />
        <Stack.Screen name={R.id.test_screen} component={TestScreen} />
        <Stack.Screen name={R.id.video_screen} component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
