var mongoose = require('mongoose');

var Database = function (address, dbName) {
    this._address = address;
    this._dbName = dbName;
    this._createConnection();
};

Database.prototype = {

    _address: null,
    _dbName: null,
    _connection: null,

    _createConnection: function () {
        this._connection = mongoose.createConnection(this._address, this._dbName);
    },

    model: function(collectionName, schema){
        return this._connection.model(collectionName, schema);
    }

};

module.exports = Database;