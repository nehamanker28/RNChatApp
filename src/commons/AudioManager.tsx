import {Alert, PermissionsAndroid, Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import {Utils} from './Utils';
import {BaseComponent} from './BaseComponent';
import {File} from '../models/file';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Sound from 'react-native-sound';

type RecordingTimerListener = (recordingTimeInSeconds: number) => void;
type RecordingCompleteListener = (file: File) => void;
type AudioPlayerListener = (
  totalTimeInSeconds: number,
  progressTimeInSeconds: number,
  isPlaying: boolean,
  source: string | null,
) => void;
type PermissionListener = (granted: boolean) => void;

export class AudioManager {
  audioRecorderPlayer = new AudioRecorderPlayer();
  rtl: RecordingTimerListener;
  rcl: RecordingCompleteListener;
  apl: AudioPlayerListener;
  pl: PermissionListener;
  context: BaseComponent;
  dirs = RNFetchBlob.fs.dirs;
  isRecording = false;
  isPlaying = false;
  callback: any;
  path: string | null = null;
  recordingTimeInSeconds: number = 0;

  constructor(
    context: BaseComponent,
    rtl: RecordingTimerListener,
    rcl: RecordingCompleteListener,
    apl: AudioPlayerListener,
    pl: PermissionListener,
  ) {
    this.context = context;
    this.rtl = rtl;
    this.rcl = rcl;
    this.apl = apl;
    this.pl = pl;
  }

  startRecording() {
    this.context
      .lifecycleScope<void>(async () => {
        await this._startRecording();
      })
      .then((_: void) => {})
      .catch((_: Error) => {
        console.error(_);
      });
  }

  async _startRecording() {
    if (await this._audioPermissions()) {
      const name = Utils.uuid4();
      this.path = Platform.select({
        ios: `${name}.m4a`,
        android: `${this.dirs.CacheDir}/${name}.mp3`,
      })!;
      const result = await this.audioRecorderPlayer.startRecorder(this.path);
      this.isRecording = true;
      this.recordingTimeInSeconds = 0;
      this.audioRecorderPlayer.addRecordBackListener(e => {
        let recordSecs = Math.floor(e.currentPosition / 1000);
        if (this.recordingTimeInSeconds !== recordSecs) {
          this.recordingTimeInSeconds = recordSecs;
          this.rtl(recordSecs);
        }
      });
      console.debug('Start Recording', result);
    }
  }

  // unused
  async pauseRecording() {
    let result = await this.audioRecorderPlayer.pauseRecorder();
    console.debug(result);
  }

  // unused
  async resumeRecording() {
    let result = await this.audioRecorderPlayer.resumeRecorder();
    console.debug(result);
  }

  stopRecording() {
    this.context
      .lifecycleScope<void>(async () => {
        await this._stopRecording();
      })
      .then((_: void) => {})
      .catch((_: Error) => {
        console.error(_);
      });
  }

  async _stopRecording() {
    if (this.isRecording) {
      const result = await this.audioRecorderPlayer.stopRecorder();
      const duration = this.recordingTimeInSeconds;
      const fileName = this.path!.split('/').pop()!;
      const mimetype = `audio/${fileName.split('.').pop()}`;
      const file = {
        path: this.path!,
        name: fileName,
        mimetype: mimetype,
        duration: duration,
      } as File;
      this.audioRecorderPlayer.removeRecordBackListener();
      this.isRecording = false;
      this.recordingTimeInSeconds = 0;
      this.rtl(0);
      this.rcl(file);
      this.path = null;
      console.debug('Recording stopped.', result);
    }
  }

  cancelRecording() {
    this.context
      .lifecycleScope<void>(async () => {
        await this._cancelRecording();
      })
      .then((_: void) => {})
      .catch((_: Error) => {
        console.error(_);
      });
  }

  async _cancelRecording() {
    let result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.isRecording = false;
    this.recordingTimeInSeconds = 0;
    this.rtl(0);
    if (await RNFetchBlob.fs.exists(this.path!)) {
      await RNFetchBlob.fs.unlink(this.path!);
    }
    this.path = null;
    console.debug('Recording cancelled.', result);
  }

  // player from here

  startPlaying(path: string) {
    this.context
      .lifecycleScope<void>(async () => {
        await this._startPlaying(path);
      })
      .then((_: void) => {})
      .catch((_: Error) => {
        console.error(_);
      });
  }

  async _startPlaying(source: string) {
    if (await this._audioPermissions()) {
      const result = await this.audioRecorderPlayer.startPlayer(source);
      this.isPlaying = true;
      this.audioRecorderPlayer.addPlayBackListener(e => {
        this.isPlaying = e.currentPosition !== e.duration;
        let progressTimeInSeconds = Math.floor(e.currentPosition / 1000);
        let totalTimeInSeconds = Math.floor(e.duration / 1000);
        this.apl(
          totalTimeInSeconds,
          progressTimeInSeconds,
          this.isPlaying,
          source,
        );
      });
      console.debug('Audio Play Completed.', result);
    }
  }

  // unused
  async _pausePlaying() {
    let result = await this.audioRecorderPlayer.pausePlayer();
    console.debug(result);
  }
  // unused
  async _resumePlaying(progress?: number) {
    if (progress !== undefined) {
    }
    await this.audioRecorderPlayer.seekToPlayer(5);
    let result = await this.audioRecorderPlayer.resumePlayer();
    console.debug(result);
  }

  pausePlaying() {
    this.context
      .lifecycleScope<void>(async () => {
        await this._pausePlaying();
      })
      .then((_: void) => {})
      .catch((_: Error) => {
        console.error(_);
      });
  }

  resumePlaying(progress?: number) {
    this.context
      .lifecycleScope<void>(async () => {
        await this._resumePlaying(progress);
      })
      .then((_: void) => {})
      .catch((_: Error) => {
        console.error(_);
      });
  }

  stopPlaying() {
    this.context
      .lifecycleScope<void>(async () => {
        await this._stopPlaying();
      })
      .then((_: void) => {})
      .catch((_: Error) => {
        console.error(_);
      });
  }

  async _stopPlaying() {
    if (this.isPlaying) {
      let result = await this.audioRecorderPlayer.stopPlayer();
      this.audioRecorderPlayer.removePlayBackListener();
      this.isPlaying = false;
      this.apl(0, 0, false, null);
      console.debug(result);
    }
  }

  async requestAudioPermissions() {
    await this._audioPermissions()
      .then((granted: boolean) => {
        console.info('requestAudioPermissions', granted);
        this.pl(granted);
      })
      .catch((e: Error) => {
        console.error(e);
      });
  }

  async _audioPermissions() {
    if (Platform.OS === 'android') {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true;
      }
    } else if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.MICROPHONE).then(result => {
        console.log(result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Alert.alert('Askim would like to use your microphone', '', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => openSettings()},
            ]);
            //openSettings().catch(() => console.warn('cannot open settings'));
            break;
        }
      });
      return true;
    }
    return false;
  }
}
