var config = require('./config/config');
var Application = require('./app/Application');
var Database = require('./app/database/Database');

var db = new Database(config.mongo.HOSTNAME, config.mongo.DATABASE);
var app = new Application(config.http.PORT, db);

app.start();
