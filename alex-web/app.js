var Application = require('./app/Application');
var Database = require('./app/database/Database');

var db = new Database('localhost', 'alex');

var app = new Application(process.env.PORT || 3000, db);
app.start();
