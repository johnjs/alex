var config = require('../../../config/config');
var Database = require('../../../app/database/Database');

var db = new Database(config.mongo.HOSTNAME, config.mongo.DATABASE);

module.exports = db;
