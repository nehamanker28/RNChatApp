import Realm from 'realm';
import {Utils} from '../commons/Utils';
import moment from 'moment';
import {Attachment} from './attachment';
import {File} from './file';
import {Platform} from 'react-native';
export enum MessageStatus {
  created = 'created',
  delivered = 'delivered',
  acknowledged = 'acknowledged',
}

export interface MessageInput {
  sender: string;
  text?: string;
  file?: File;
}

export class Message extends Realm.Object<Message> {
  _id?: string;
  message_id!: string;
  message_text?: string;
  created_at!: string;
  sender_id!: string;
  attachments!: Realm.List<Attachment>;
  status?: string;

  static schema = {
    name: 'Message',
    properties: {
      _id: 'string?',
      message_id: 'string',
      message_text: 'string?',
      created_at: 'string',
      sender_id: 'string',
      attachments: 'Attachment[]',
      status: 'string?',
    },
    primaryKey: 'message_id',
  };

  static newInstance(input: MessageInput): any {
    let attachments: any = [];
    if (input.file !== undefined) {
      attachments = [Attachment.newInstance(input.file!)];
    }
    return {
      message_id: Utils.uuid4(),
      created_at: Utils.getCurrentUtcDateTime(),
      sender_id: input.sender,
      message_text: input.text,
      attachments: attachments,
    };
  }

  getTimeStatus(): string {
    var date = new Date(this.created_at!);
    var formatted = moment(date).fromNow();
    return formatted;
  }

  isAuthor(profileId: string): boolean {
    return this.sender_id === profileId;
  }

  getSingleAudioPath(): string | null {
    if (this.attachments.length > 0) {
      if (
        this.attachments[0].path !== undefined &&
        this.attachments[0].path !== null
      ) {
        var path = '';
        if (Platform.OS === 'ios') {
          path = this.attachments[0].path.substring(
            this.attachments[0].path!.lastIndexOf('/') + 1,
          );
        } else {
          path = this.attachments[0].path!;
        }
        return path;
      }
    }
    return null;
  }

  getSingleAudioDuration(): string {
    return '0.12';
  }

  getAttachment(): Attachment | null {
    if (this.attachments.length > 0) {
      return this.attachments[0];
    }
    return null;
  }
}
