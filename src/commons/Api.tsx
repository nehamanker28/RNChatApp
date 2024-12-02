import RNFetchBlob from 'rn-fetch-blob';
import {R} from '../constant';
import {Profile} from '../models/profile';
import {Thread} from '../models/thread';
import {NetworkException} from './NetworkException';
import {Prefs} from './Prefs';
import {Attachment} from '../models/attachment';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
// 'Authorization': 'Basic '+btoa('email:password')
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProgressListener = (progress: number) => void;

export class Api {
  static async account_register(email: string): Promise<void> {
    let response = await fetch(`${R.string.apiHost}/account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    if (response.status === 409) {
      throw new NetworkException(
        response.status,
        'Email is already register with us. Please use different email.',
      );
    } else if (!response.ok) {
      throw new NetworkException(
        response.status,
        'Something went wrong. Please try again later.',
      );
    }
  }

  static async account_login(email: string, password: string): Promise<string> {
    let response = await fetch(`${R.string.apiHost}/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.status === 401) {
      throw new NetworkException(response.status, 'Invalid email or password.');
    }
    // cleanup required
    else if (response.status === 400) {
      throw new NetworkException(response.status, 'Invalid email or password.');
    } else if (!response.ok) {
      throw new NetworkException(
        response.status,
        'Something went wrong. Please try again later.',
      );
    }
    const body = await response.json();
    console.debug('Profile', body);
    return body.access_token;
  }

  static async account_profile_read(): Promise<Profile> {
    let token = await Prefs.getBearerTokenOrThrowException();
    let response = await fetch(`${R.string.apiHost}/account/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${token}`,
      },
    });
    await this.ensure_result(response);
    const body = await response.json();
    return new Profile({
      _id: body._id,
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      avatar: body.avatar,
      phone: body.phone,
      dob: body.dob,
      address: body.address,
    });
  }

  static async account_profile_update(
    first_name: string | undefined,
    last_name: string | undefined,
    phone: string | undefined,
    avatar: string | undefined,
  ): Promise<Profile> {
    let token = await Prefs.getBearerTokenOrThrowException();
    // avoid null values using nested JSON
    let data = JSON.stringify(
      JSON.parse(
        JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          avatar: avatar,
        }),
      ),
    );
    console.info('Profile Data:', data);
    let response = await fetch(`${R.string.apiHost}/account/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    await this.ensure_result(response);
    const result = await this.account_profile_read();
    return result;
  }

  // generate password change token
  static async account_password_token(
    email: string,
    otp: string,
  ): Promise<string> {
    let response = await fetch(`${R.string.apiHost}/account/password/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    });
    await this.ensure_result(response);
    const body = await response.json();
    return body.token;
  }

  static async account_password_forgot(email: string): Promise<void> {
    let response = await fetch(`${R.string.apiHost}/account/password/forgot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    if (response.status === 204) {
      throw new NetworkException(
        response.status,
        'Following email is not register with us. Please use register email instead.',
      );
    } else if (!response.ok) {
      throw new NetworkException(
        response.status,
        'Something went wrong. Please try again later.',
      );
    }
  }

  static async account_password_reset(
    email: string,
    password: string,
    token: string,
  ): Promise<void> {
    let response = await fetch(`${R.string.apiHost}/account/password/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        token: token,
      }),
    });
    await this.ensure_result(response);
  }
  static async change_password(
    currrentpassword: string,
    newpassword: string,
  ): Promise<void> {
    let token = await Prefs.getBearerTokenOrThrowException();
    console.log('TOKENNN', token);
    let response = await fetch(`${R.string.apiHost}/account/password/change`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        current_password: currrentpassword,
        new_password: newpassword,
      }),
    });
    // if (response.status === 401) {
    //   throw new NetworkException(response.status, 'Invalid email or password.');
    // }
    // cleanup required
    if (response.status === 400) {
      throw new NetworkException(response.status, 'Invalid current password');
    } else if (!response.ok) {
      throw new NetworkException(
        response.status,
        'Something went wrong. Please try again later.',
      );
    }
    //await this.ensure_result(response);
  }
  static async account_logout(): Promise<void> {
    let token = await Prefs.getBearerTokenOrThrowException();
    await fetch(`${R.string.apiHost}/account/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        logout_all: false,
      }),
    });
  }

  // this return default message thread
  static async read_default_thread(): Promise<Thread> {
    let token = await Prefs.getBearerTokenOrThrowException();
    let response = await fetch(`${R.string.apiHost}/message/thread`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await this.ensure_result(response);
    const body = await response.json();
    return new Thread({
      _id: body._id,
      name: body.name,
    });
  }

  static async read_thread_messages(
    threadId: string,
    limit: number = 10,
    offset: number = 0,
  ): Promise<Array<any>> {
    console.info('limit:', limit, 'offset:', offset);
    let token = await Prefs.getBearerTokenOrThrowException();
    let response = await fetch(
      `${R.string.apiHost}/message/thread/${threadId}?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    await this.ensure_result(response);
    return await response.json();
  }

  static async post_thread_message(
    threadId: string,
    messageId: string,
    messageText: string,
  ): Promise<any> {
    console.debug(messageText, 'text');
    let token = await Prefs.getBearerTokenOrThrowException();
    let response = await fetch(
      `${R.string.apiHost}/message/thread/${threadId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message_id: messageId,
          message_text: messageText,
        }),
      },
    );
    if (response.ok) {
      console.info('message sent!');
    } else {
      console.info('message failed!');
    }
    await this.ensure_result(response);
    return await response.json();
  }

  static async upload_file(
    id: string,
    attachment: Attachment,
    pl: ProgressListener,
  ): Promise<any> {
    console.info('Uploading from...', attachment.path!);
    // await Utils.delay(5000);
    const token = await Prefs.getBearerTokenOrThrowException();
    const duration =
      attachment.duration !== null ? attachment.duration!.toString() : '0';
    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
      ios: `${dirs.CacheDir}/${attachment.path!}`,
      android: attachment.path!,
    })!;
    const response = await RNFetchBlob.fetch(
      'PUT',
      `${R.string.apiHost}/message/${id}/attachment`,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'name', data: attachment.name},
        {
          name: 'duration',
          data: duration,
        },
        {
          name: 'file',
          filename: attachment.name,
          type: attachment.mimetype!,
          data: RNFetchBlob.wrap(path),
        },
      ],
    ).progress({interval: 200}, (received = 0, total = 0) => {
      pl(Math.floor((received / total) * 100));
    });
    if (response.info().status === 200) {
      pl(100);
      return response.json();
    } else {
      throw new NetworkException(response.info().status, 'Failed to upload.');
    }
  }

  static async download_file(
    attachment: Attachment,
    pl: ProgressListener,
  ): Promise<string> {
    console.info('Downloading from...', attachment.url!);
    // await Utils.delay(5000);
    const dirs = RNFetchBlob.fs.dirs;
    const path = `${dirs.CacheDir}/${attachment.name}`;
    if (await RNFetchBlob.fs.exists(path)) {
      await RNFetchBlob.fs.unlink(path);
    }
    const response = await RNFetchBlob.config({
      path: path,
    })
      .fetch('GET', attachment.url!, {})
      .progress({interval: 200}, (received = 0, total = 0) => {
        pl(Math.floor((received / total) * 100));
      });
    if (response.info().status === 200) {
      pl(100);
      return path;
    } else {
      throw new NetworkException(response.info().status, 'Failed to download.');
    }
  }
  static async getCurrentToken() {
    let token, retry;
    try {
      token = await messaging()
        .getToken()
        .then(response => {
          console.log('FCM TOKEN1', response);
          if (response) {
            AsyncStorage.setItem('fcmtoken', response);
          }
          return response;
        });
    } catch (error) {
      // Some iOS devices fail to auto register remote notifications at launch, thus "You must be registered for remote messages before calling getToken" error.
      // Handle this by request notification permission and manually register for remote notifications
      //if (error.code !== 'messaging/unregistered') throw error;
      retry = true;
    }
    if (retry) {
      try {
        await messaging().requestPermission(); // IMPORTANT!

        await messaging().registerDeviceForRemoteMessages();
        token = await messaging()
          .getToken()
          .then(response => {
            console.log('FCM TOKEN2', response);
            if (response) {
              AsyncStorage.setItem('fcmtoken', response);
            }
            return response;
          });
        // IMPORTANT!

        // console.log('FCM TOKEN', token);
      } catch (error) {
        throw error;
      }
    }
    return token;
  }
  static async registerNotificationDevice(): Promise<void> {
    const token = await Prefs.getBearerTokenOrThrowException();
    // const fcmToken = await messaging().getToken()
    const fcmToken = await this.getCurrentToken();
    const deviceId = await DeviceInfo.getUniqueId();
    console.log(
      'fcmToken',
      fcmToken,
      JSON.stringify({
        device_uuid: deviceId,
        firebase_token: fcmToken,
        platform: Platform.OS,
      }),
    );
    let response = await fetch(`${R.string.apiHost}/notification/device`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        device_uuid: deviceId,
        firebase_token: fcmToken,
        platform: Platform.OS,
      }),
    });
    if (response.ok) {
      console.debug('Firebase token sent.', response);
    } else {
      console.info('Firebase token failed.');
    }
    await this.ensure_result(response);
  }

  static async ensure_result(response: any) {
    if (!response.ok) {
      console.error(response.status);
      console.error(response.body);
      if (response.status === 401) {
        throw new NetworkException(
          response.status,
          'Invalid email or password.',
        );
      } else {
        throw new NetworkException(
          response.status,
          'Something went wrong. Please try again later.',
        );
      }
    }
  }
}
