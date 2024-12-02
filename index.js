/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
// define global names
global.repository = null;

AppRegistry.registerComponent(appName, () => App);
// disable in app logs
LogBox.ignoreAllLogs(true);