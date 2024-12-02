// Transaction: _id: string, summary: string, date: string, amount: number, transaction_type: string
export class Transaction {

    _id: string;
    summary: string;
    date :string;
    amount: number;
    transaction_type :string;
  
    constructor({
        _id,
        summary,
        date,
        amount,
        transaction_type,
    }: {
        _id: string;
        summary: string;
        date: string;
        amount: number;
        transaction_type: string;
    }) 
    {
      this._id = _id;
      this.summary = summary;
      this.date = date;
      this.amount = amount;
      this.transaction_type = transaction_type
    }


  }