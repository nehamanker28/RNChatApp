export class Notification {
  // Notification: _id: string, title: string, body: string, date: string, notification_type: string

  _id: string;
  title: string;
  body: string;
  date: string;
  notification_type: string;

  static schema = {
    name: 'Notification',
    properties: {
      _id: 'string?',
      title: 'string',
      body: 'string?',
      date: 'string',
      notification_type: 'string',
    },
    primaryKey: '_id',
  };

  constructor({
    _id,
    title,
    body,
    date,
    notification_type,
  }: {
    _id: string;
    title: string;
    body: string;
    date: string;
    notification_type: string;
  }) {
    this._id = _id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.notification_type = notification_type;
  }
}
