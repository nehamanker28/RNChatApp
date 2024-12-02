// History: _id: string, title: string, body: string, date: string, history_type: string
export class History {
    _id: string;
    title: string;
    body?: string;
    date?: string;
    history_type?: string;
  
    constructor({
      _id,
      title,
      body,
      date,
      history_type,
    }: {
        _id: string;
        title: string;
        body?: string;
        date?: string;
        history_type?: string;
    }) {
      this._id = _id;
      this.title = title;
      this.body = body;
      this.date = date;
      this.history_type = history_type;
    }
  
  }
  
