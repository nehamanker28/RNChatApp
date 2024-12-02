import AsyncStorage from '@react-native-async-storage/async-storage';
import {BaseException} from './BaseException';
import {Profile} from '../models/profile';
import {Thread} from '../models/thread';

const BEARER_TOKEN = 'bearer_token';
const ACCOUNT_PROFILE = 'account_profile';
const DEFAULT_THREAD_ID = 'default_thread_id';

export class Prefs {
  static async setBearerToken(token: string): Promise<void> {
    await AsyncStorage.setItem(BEARER_TOKEN, token);
  }

  static async getBearerToken(): Promise<string | null> {
    return await AsyncStorage.getItem(BEARER_TOKEN);
  }

  static async setProfile(profile: Profile): Promise<void> {
    await AsyncStorage.setItem(ACCOUNT_PROFILE, profile.serialize());
  }

  static async getProfile(): Promise<Profile> {
    let body = await AsyncStorage.getItem(ACCOUNT_PROFILE);
    if (body != null) {
      return Profile.deserialize(body);
    }
    throw new BaseException('Account login required.');
  }

  static async setDefaultThread(thread: Thread): Promise<void> {
    await AsyncStorage.setItem(DEFAULT_THREAD_ID, thread.serialize());
  }

  static async getDefaultThread(): Promise<Thread | null> {
    let body = await AsyncStorage.getItem(DEFAULT_THREAD_ID);
    if (body !== null) {
      return Thread.deserialize(body);
    }
    return null;
  }

  static async getBearerTokenOrThrowException(): Promise<string | null> {
    let token = this.getBearerToken();
    if (token === null) {
      throw new BaseException('Account login required.');
    }
    return token;
  }

  static async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}
