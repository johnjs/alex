var config = require('./config/config');
var Application = require('./app/Application');
var Database = require('./app/database/Database');

var dbConfig = config.mongo;

var db = new Database(dbConfig.HOSTNAME, dbConfig.DATABASE, dbConfig.PORT, dbConfig.USERNAME, dbConfig.PASSWORD);
var app = new Application(config.http.PORT, db);

app.start();
