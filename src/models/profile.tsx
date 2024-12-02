export class Profile {
  _id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  dob?: string;
  phone?: string;
  avatar?: string;
  address?: string;

  constructor({
    _id,
    email,
    first_name,
    last_name,
    dob,
    phone,
    avatar,
    address,
  }: {
    _id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    dob?: string;
    phone?: string;
    avatar?: string;
    address?: string;
  }) {
    this._id = _id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.dob = dob;
    this.phone = phone;
    this.avatar = avatar;
    this.address = address;
  }

  serialize(): string {
    let json = {
      _id: this._id,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      dob: this.dob,
      phone: this.phone,
      avatar: this.avatar,
      address: this.address,
    };
    return JSON.stringify(json);
  }

  static deserialize(body: string): Profile {
    let json = JSON.parse(body);
    return new Profile({
      _id: json._id,
      email: json.email,
      first_name: json.first_name,
      last_name: json.last_name,
      dob: json.dob,
      phone: json.phone,
      avatar: json.avatar,
      address: json.address,
    });
  }

  isProfileCompleted(): boolean {
    return this.first_name !== undefined || this.last_name !== undefined;
  }

  getDisplayName(): string {
    if (this.isProfileCompleted()) {
      return this.first_name + ' ' + this.last_name;
    }
    return 'Unnamed';
  }
}
