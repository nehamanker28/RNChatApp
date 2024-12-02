import Realm from 'realm';

// import {plainToInstance, instanceToInstance} from 'class-transformer';
// new Realm.BSON.ObjectId()

export class UlDl extends Realm.Object<UlDl> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  path?: string;
  url?: string;
  progress!: number;

  static schema = {
    name: 'UlDl',
    properties: {
      _id: 'objectId',
      name: 'string',
      path: 'string?',
      url: 'string?',
      progress: 'int',
    },
    primaryKey: '_id',
  };

  async process(realm: Realm) {
    if (this.path === undefined && this.url === undefined) {
      throw new Error('Invalid UlDl object.');
    } else if (this.path !== undefined && this.url === undefined) {
      // upload file
    } else if (this.url !== undefined && this.path === undefined) {
      // download file
    } else {
      // do nothing
    }
  }
}
