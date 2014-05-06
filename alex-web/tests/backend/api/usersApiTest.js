var app = require('../../../app_test');
var requestUtils = require('../utils/request');
var expect = require('chai').expect;
var Q = require('q');

describe('Users API test', function() {

  //given
  var SAMPLE_USER_1 = {
    username: 'test1',
    password: 'testpass'
  };

  var SAMPLE_USER_2 = {
    username: 'test2',
    password: 'testpass'
  };

  var _prepareDatabase = function() {
    return Q.all([
      app.users.save(SAMPLE_USER_1),
      app.users.save(SAMPLE_USER_2)
    ]);
  };

  var request;

  before(function(done) {
    app.start().on('listening', done);
    request = requestUtils(app.app);
  });

  beforeEach(function(done) {
    _prepareDatabase().then(function() {
      done();
    });
  });

  describe('Find', function() {
    //TODO[DoMi] add tests when admin panel will be implemented
  });

  afterEach(function(done) {
    app.database._connection.collections['users'].drop(done);
  });

  after(function(done) {
    app.shutdown(done);
  });

});
