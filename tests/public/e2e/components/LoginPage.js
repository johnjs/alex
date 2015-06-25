var ElementFinder = require('../utils/ElementFinder');
var protractor = require('protractor');

var LoginPage = function() {
  var driver = protractor.getInstance().driver;

  this.login = function(username, password) {
    ElementFinder.findByName('username').sendKeys(username);
    ElementFinder.findByName('password').sendKeys(password);
  };

  this.get = function() {
    driver.get('http://localhost:3000/login');
  };
};

module.exports = LoginPage;
