var protractor = require('protractor');
var app = require('./../../../app_test');

var LoginPage = require('./components/LoginPage');

describe('Authentication scenario', function() {

  var driver;
  var loginPage;

  beforeEach(function() {
    app.start().on('listening', function() {

    });
    driver = protractor.getInstance().driver;
    loginPage = new LoginPage();
  });


  it('should log in the user', function() {
    //when
    loginPage.get();

    //when
    loginPage.login('username', 'password');

    //then
    expect(true).toEqual(true);
  });

  afterEach(function() {
    app.shutdown();
  });

});
