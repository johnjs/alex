var Database  = require('../app/database/Database');
var Application = require('../app/Application');
var logger = require('../app/utils/Logger');

logger.setTestingMode();
var db = new Database('localhost', 'alex-test')

var app = new Application(process.env.PORT || 3000, db);

module.exports = app;