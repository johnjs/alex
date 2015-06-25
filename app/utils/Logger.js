var winston = require('winston');
var path = require('path');
var moment = require('moment');

var log = {
  'logger': {
    'levels': {
      'info': 0,
      'warn': 1,
      'error': 2
    },
    'colors': {
      'info': 'green',
      'warn': 'yellow',
      'error': 'red'
    }
  }
};
winston.addColors(log.logger.colors);


var Logger = function() {
  this.setDevMode();
};

Logger.prototype = {
  logger: null,

  setDevMode: function() {
    this.logger = new(winston.Logger)({
      level: 'info',
      transports: [
        new(winston.transports.Console)({
          'level': 'info',
          'colorize': true
        }),
        new(winston.transports.File)({
          filename: './logs/project.log',
          maxsize: 1024 * 1024 * 10
        })
      ]
    });
    this.logger.setLevels(log.logger.levels);
  },

  setTestingMode: function() {
    this.logger.remove(winston.transports.Console);
  },

  getLogger: function() {
    return this.logger;
  },

  logResponse: function(logType, message, res) {
    this.logger.log(logType, '[%s][%s] ' + message, moment().format(), res.req.ip);
  },

  logRequest: function(req) {
    this.logger.info('[%s][%s] %s %s', moment().format(), req.ip, req.method, req.url, req.body);
  },

  logError: function(message) {
    this.logger.error('[%s] %s', moment().format(), message);
  }

};

var logger = new Logger();

module.exports = logger;
