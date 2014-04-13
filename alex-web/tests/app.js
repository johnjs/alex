var Application = require('../app/Application');
var logger = require('../app/utils/Logger');

logger.setTestingMode();

var app = new Application(process.env.PORT || 3000);

module.exports = app;