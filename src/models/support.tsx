// Support: _id: string, title: string, link: string

export class Support {
    _id: string;
    title: string;
    link :string;
    
  
    constructor({
     _id,
     title,
     link,
    
    }: {
        _id: string,
        title: string,
       link :string,
        
    }) {
      this._id = _id;
      this.title = title;
      this.link = link;
      
    }


  }
  