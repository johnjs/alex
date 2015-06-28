var _ = require('underscore');

var globalConfig = require('./global.json');
var envConfig = require('./' + (process.env.NODE_ENV || 'development') + '.json');

var config = _.extend(globalConfig, envConfig);

config.http.ENV = process.env.NODE_ENV || config.http.ENV;
config.http.PORT = process.env.NODE_PORT || config.http.PORT;

config.mongo.DATABASE = process.env.MONGO_DATABASE || config.mongo.DATABASE;
config.mongo.HOSTNAME = process.env.MONGO_HOSTNAME || config.mongo.HOSTNAME;
config.mongo.PORT = process.env.MONGO_PORT || config.mongo.PORT;
config.mongo.USERNAME = process.env.MONGO_USERNAME || config.mongo.USERNAME;
config.mongo.PASSWORD = process.env.MONGO_PASSWORD || config.mongo.PASSWORD;

config.oauth.FACEBOOK_APP_ID = process.env.OAUTH_FACEBOOK_APP_ID || config.oauth.FACEBOOK_APP_ID;
config.oauth.FACEBOOK_APP_SECRET = process.env.OAUTH_FACEBOOK_APP_SECRET || config.oauth.FACEBOOK_APP_SECRET;
config.session.SECRET = process.env.SESSION_SECRET || config.session.SECRET;

module.exports = config;