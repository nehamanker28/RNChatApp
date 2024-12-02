export class Faq {
    _id: string;
    title: string;
    description :string;
    category :string;
  
    constructor({
     _id,
     title,
     description,
     category,
    }: {
        _id: string,
        title: string,
        description :string,
        category :string,
    }) {
      this._id = _id;
      this.title = title;
      this.description = description;
      this.category = category;
    }


  }
  