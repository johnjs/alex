var Application = require('../app/Application');

var app = new Application(process.env.PORT || 3000);

module.exports = app;