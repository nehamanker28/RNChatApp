import Realm from 'realm';
import {Message} from '../models/message';
import {BaseComponent} from './BaseComponent';
import {Thread} from '../models/thread';
import {Api} from './Api';
import {BaseException} from './BaseException';
import {Attachment, AttachmentStatus} from '../models/attachment';
import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Notification} from '../models/notification';

export class Repository {
  realm: Realm;
  lock: boolean;
  //repository: Repository;

  constructor(realm: Realm) {
    this.realm = realm;
    this.lock = false;
    this._handleNotification();
  }

  deleteAll() {
    this.realm.beginTransaction();
    this.realm.deleteAll();
    this.realm.commitTransaction();
  }

  _handleNotification() {
    console.log('handle notification');

    useEffect(() => {
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        this.saveNotification(remoteMessage.notification);
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });
      messaging().onMessage(remoteMessage => {
        console.log('Notification remoteMessage', remoteMessage);
      });
    }, []);
  }

  saveNotification(data: any) {
    this.realm.beginTransaction();
    let notification = this.realm.create(
      Notification.schema.name,
      data,
    ) as Notification;
    this.realm.commitTransaction();
    //console.info('Realm Message Before:', message);

    this.realm.beginTransaction();
    // this.realm.create(
    //   Notification.schema.name,
    //   {...created, ...{attachments: message.attachments}},
    //   Realm.UpdateMode.Modified,
    // );
    notification.body = data.body;
    notification.title = data.title;
    this.realm.commitTransaction();
    // console.info('Realm Message After:', message);
    // await this.uploadFiles(message);
  }
  postMessage(context: BaseComponent, thread: Thread, data: any) {
    context
      .lifecycleScope<void>(async () => {
        this.realm.beginTransaction();
        let message = this.realm.create(Message.schema.name, data) as Message;
        this.realm.commitTransaction();
        console.info('Realm Message Before:', message);
        const body =
          message.message_text !== null ? message.message_text! : ' ';
        const created = await Api.post_thread_message(
          thread._id,
          message.message_id,
          body,
        );
        console.info('created:', created);
        this.realm.beginTransaction();
        this.realm.create(
          Message.schema.name,
          {...created, ...{attachments: message.attachments}},
          Realm.UpdateMode.Modified,
        );
        this.realm.commitTransaction();
        console.info('Realm Message After:', message);
        await this.uploadFiles(message);
      })
      .then((_: void) => {})
      .catch((_: BaseException) => {
        console.error(_);
      });
  }

  async uploadFiles(message: Message) {
    for (let index = 0; index < message.attachments.length; index++) {
      const local = message.attachments[index];
      console.info('Local Attachment:', local);
      this.realm.beginTransaction();
      local.status = AttachmentStatus.PROCESSING;
      this.realm.commitTransaction();
      try {
        const remote = await Api.upload_file(
          message._id!,
          local,
          (_: number) => {
            console.info('Upload Progress:', _);
          },
        );
        console.info('Remote Attachment:', remote);
        this.realm.beginTransaction();
        local._id = remote._id;
        local.checksum = remote.checksum;
        local.mimetype = remote.mimetype;
        local.size = remote.size;
        local.url = remote.url;
        local.duration = remote.duration;
        // remove
        // local.path = null;
        // local.url =
        //   'https://file-examples.com/storage/fee472ce6e64b122ba0c8b3/2017/11/file_example_MP3_2MG.mp3';
        local.status = AttachmentStatus.SUCCESS;
        this.realm.commitTransaction();
      } catch (e: any) {
        console.error('Upload Error:', e);
        this.realm.beginTransaction();
        local.status = AttachmentStatus.ERROR;
        this.realm.commitTransaction();
      }
    }
  }

  async downloadAttachment(local: Attachment): Promise<void> {
    console.debug('Downloading...:', local);
    console.info('Local Attachment:', local);
    this.realm.beginTransaction();
    local.status = AttachmentStatus.PROCESSING;
    this.realm.commitTransaction();
    try {
      const path = await Api.download_file(local, (_: number) => {
        console.info('Download Progress:', _);
      });
      this.realm.beginTransaction();
      local.path = path;
      local.status = AttachmentStatus.SUCCESS;
      this.realm.commitTransaction();
    } catch (e: any) {
      console.error('Upload Error:', e);
      this.realm.beginTransaction();
      local.status = AttachmentStatus.ERROR;
      this.realm.commitTransaction();
    }
  }

  syncMessages(context: BaseComponent, thread: Thread) {
    context
      .lifecycleScope<void>(async () => {
        await this.fetchMessages(thread);
      })
      .then((_: void) => {})
      .catch((_: Error) => {
        console.error('found error');
        console.error(_);
      });
  }

  async fetchMessages(thread: Thread, limit: number = 10, offset: number = 0) {
    const count = this.realm.objects(Message).length;
    console.info('Cached Message Count:', count);
    console.info('Fetching Start...');
    let result = await Api.read_thread_messages(thread._id, limit, offset);
    console.info('Fetching End...');
    this.realm.beginTransaction();
    for (let index = 0; index < result.length; index++) {
      let element = result[index];
      this.realm.create(
        Message.schema.name,
        {...element, ...{}},
        Realm.UpdateMode.Modified,
      );
      //console.info('Fetching Message...', element._id);
      //console.info('Fetching attachments...', element.attachments);
    }
    this.realm.commitTransaction();
  }

  async lazyFetchMessages(thread: Thread) {
    const limit: number = 10;
    const offset: number = this.realm
      .objects(Message)
      .filtered('_id != $0', null).length;
    console.info('lazyFetchMessages offset:', offset);
    await this.fetchMessages(thread, limit, offset);
  }

  async cleanAttachmentStatus() {
    const result = this.realm.objects(Attachment);
    this.realm.write(() => {
      for (let index = 0; index < result.length; index++) {
        if (result[index].status !== AttachmentStatus.SUCCESS) {
          result[index].status = AttachmentStatus.PENDING;
        }
      }
    });
  }

  deltaSync() {
    setTimeout(() => {
      this.deltaSync();
    }, 15 * 1000);
  }
}
