import Realm from 'realm';
import {File} from './file';
import {Utils} from '../commons/Utils';

export enum AttachmentStatus {
  PENDING = '1',
  PROCESSING = '2',
  ERROR = '3',
  SUCCESS = '4',
}

export enum AttachmentAction {
  UPLOAD = '1',
  DOWNLOAD = '2',
  SETTLED = '3',
  UNKNOWN = '4',
}

export class Attachment extends Realm.Object<Attachment> {
  _id?: string;
  name!: string;
  mimetype?: string;
  size?: number;
  checksum?: string;
  url?: string | null;
  duration?: number;
  path?: string | null;
  status?: string;
  progress?: number;
  thumbnail?: string;

  static schema = {
    name: 'Attachment',
    properties: {
      _id: 'string?',
      name: 'string',
      mimetype: 'string?',
      size: 'int?',
      checksum: 'string?',
      duration: 'int?',
      thumbnail: 'string?',
      url: 'string?',
      path: 'string?',
      status: 'string?',
      progress: 'int?',
    },
    primaryKey: 'name',
  };

  static newInstance(file: File): any {
    return {
      path: file.path,
      name: file.name,
      mimetype: file.mimetype,
      duration: file.duration,
      status: AttachmentStatus.PENDING,
    };
  }

  getAction(): AttachmentAction {
    if (this.path === null && this.url === null) {
      return AttachmentAction.UNKNOWN;
    } else if (this.path !== null && this.url !== null) {
      return AttachmentAction.SETTLED;
    } else if (this.path !== null && this.url === null) {
      return AttachmentAction.UPLOAD;
    } else {
      return AttachmentAction.DOWNLOAD;
    }
  }

  getDuration(): string {
    if (this.duration !== null) {
      return Utils.secondsToDuration(this.duration!);
    }
    return '0.00';
  }
}
