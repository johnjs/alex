var Application = require('./app/Application');
var logger = require('./app/utils/Logger');
var database = require('./tests/backend/utils/TestDatabase');

logger.setTestingMode();

var app = new Application(process.env.PORT || 3000, database);

module.exports = app;
