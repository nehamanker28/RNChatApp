export class Thread {
  _id: string;
  name: string;

  constructor({_id, name}: {_id: string; name: string}) {
    this._id = _id;
    this.name = name;
  }

  serialize(): string {
    let json = {
      _id: this._id,
      name: this.name,
    };
    return JSON.stringify(json);
  }

  static deserialize(body: string): Thread {
    let json = JSON.parse(body);
    return new Thread({
      _id: json._id,
      name: json.name,
    });
  }
}
