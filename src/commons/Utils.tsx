/* eslint-disable no-bitwise */
import moment from 'moment';
import uuid from 'react-native-uuid';
import {Vibration, Platform} from 'react-native';

export class Utils {
  static async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(
      () => {},
    );
  }
  static getTrimmedString(text: string): string {
    var trimmedstr = text;
    if (text.includes('audio')) {
      var trimmedstr = text.replace('audio :', '');
    } else if (text.includes('video'))
      var trimmedstr = text.replace('video :', '');
    return trimmedstr;
  }
  static isNotNullOrEmpty(input?: string): boolean {
    return (input?.trim()?.length || 0) > 0;
  }

  static isNullOrEmpty(input?: string): boolean {
    return (input?.trim()?.length || 0) === 0;
  }

  static isPasswordCriteriaValid(password: string): boolean {
    return password.length >= 8;
  }

  static isEmailValid(email: string): boolean {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  }

  static uuid4(): string {
    return uuid.v4().toString();
  }

  static getCurrentUtcDateTime(): string {
    let value =
      moment().utc().format('YYYY-MM-DD') +
      'T' +
      moment().utc().format('HH:mm:ss.SSS') +
      'Z';
    return value;
  }

  static getRandomHex(length: number): string {
    let result = '';
    const characters = 'abcdef123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static vibrate(length: number) {
    Vibration.vibrate(length);
  }

  static secondsToDuration(seconds: number) {
    const hrs = ~~(seconds / 3600);
    const mins = ~~((seconds % 3600) / 60);
    const secs = ~~seconds % 60;
    let ret = '';
    if (hrs > 0) {
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  }
}
