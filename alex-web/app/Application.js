var express = require('express');
var routes = require('../routes');
var usersRouting = require('../routes/user');
var http = require('http');
var path = require('path');
var logger = require('./utils/Logger');

var UsersCollection = require('./database/Users');

var Application = function (port, database) {
    this.port = port;
    this.database = database;
    this._configuration();
    this._initRoutes();

};

Application.prototype = {
    port: null,
    app: null,
    server: null,
    database: null,
    users:null,

    _configuration: function () {
        this.app = express();
        this.app.set('port', this.port);
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'jade');
        this.app.use(express.favicon());
        this.app.use(express.logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(express.methodOverride());

        this.app.use(function (req, res, next) {
//            logger.logRequest(req);
            next();
        });

        this.app.use(this.app.router);
        this.app.use(express.static(path.join(__dirname, '../public')));

        if ('development' === this.app.get('env')) {
            this.app.use(express.errorHandler());
        }
    },

    _initRoutes: function () {
        this.users = new UsersCollection(this.database);
        var ur = usersRouting(this.users);

        this.app.get('/', routes.index);
        this.app.get('/users', ur.find);
    },

    start: function () {
        var port = this.app.get('port');
        this.server = http.createServer(this.app).listen(port, function () {
//            logger.getLogger().info('Express server listening on port ' + port);
        });

        return this.server;
    },
    shutdown: function (onClose) {
        this.server.close(onClose);
    }
}

module.exports = Application;



