var mongoose = require('mongoose');

var Database = function(address, dbName, port, username, password) {
  this._address = address;
  this._dbName = dbName;
  this._port = port;
  this._username = username;
  this._password = password;

  this._createConnection();
};

Database.prototype = {

  _address: null,
  _dbName: null,
  _port: null,
  _username: null,
  _password: null,
  _connection: null,

  _createConnection: function() {
    this._connection = mongoose.createConnection(this._address, this._dbName, this._port, {
      user: this._username,
      pass: this._password
    });
  },

  model: function(collectionName, schema) {
    return this._connection.model(collectionName, schema);
  }

};

module.exports = Database;
