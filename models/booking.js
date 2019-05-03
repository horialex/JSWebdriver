class Booking {
    constructor(itemName, startDate, endDate, user) {
        this._itemName = itemName;
        this._startDate = startDate;
        this._endDate = endDate;
        this._user = user;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(itemName) {
        this._itemName = itemName;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(startDate) {
        this._startDate = startDate;
    }
    
    get endDate(){
        return this._endDate;
    }

    set endDate(endDate) {
        this._endDate = endDate;
    }

    get user() {
        return this._user;
    }

    set user(user) {
        this._user = user;
    }

}
module.exports = Booking;