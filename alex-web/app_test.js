var logger = require('./app/utils/Logger');
var config = require('./config/config');

var Application = require('./app/Application');
var database = require('./tests/backend/utils/TestDatabase');

logger.setTestingMode();

var app = new Application(config.http.PORT, database);

module.exports = app;
