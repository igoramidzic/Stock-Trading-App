export class AccountQuery {
    userId: string;
    _id: string;

    constructor(userId: string, _id?: string) {
        this.userId = userId;
        if (_id)
            this._id = _id
    }
}