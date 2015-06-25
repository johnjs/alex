var passport = require('passport');
var flash = require('connect-flash');
var express = require('express');

var routes = require('../routes/routes');

var http = require('http');
var path = require('path');

var logger = require('./utils/Logger');
var UsersCollection = require('./database/Users');
var WordsCollection = require('./database/Words');

var Application = function(port, database) {

  this.port = port;
  this.database = database;

  this._initCollections();
  this._configuration();
  this._initRoutes();

};

Application.prototype = {
  port: null,
  app: null,
  server: null,
  database: null,

  users: null,
  words: null,

  _configuration: function() {
    this.app = express();
    this.app.set('port', this.port);
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'jade');
    this.app.use(express.favicon());
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(express.methodOverride());
    this.app.use(express.cookieParser()); // read cookies (needed for auth)

    this.app.use(function(req, res, next) {
      logger.logRequest(req);
      next();
    });

    this.app.use(express.session({
      secret: 'se33ionDomMiS3cr3t'
    })); // session secret
    this.app.use(passport.initialize());
    this.app.use(passport.session()); // persistent login sessions
    this.app.use(flash());

    this.app.use(this.app.router);
    this.app.use(express.static(path.join(__dirname, '../public')));

    if ('development' === this.app.get('env')) {
      this.app.use(express.errorHandler());
    }
  },

  _initCollections: function() {
    this.users = new UsersCollection(this.database);
    this.words = new WordsCollection(this.database);

    require('./auth/passport')(this.users, passport);
  },

  _initRoutes: function() {
    routes(this.app, this.users, this.words, passport);
  },

  start: function() {
    var port = this.app.get('port');
    this.server = http.createServer(this.app).listen(port, function() {
      logger.getLogger().info('Express server listening on port ' + port);
    });

    return this.server;
  },
  shutdown: function(onClose) {
    this.server.close(onClose);
  }
};

module.exports = Application;
