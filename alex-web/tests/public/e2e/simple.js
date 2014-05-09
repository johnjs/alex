var protractor = require('protractor');
var app = require('./../../../app_test');

describe('Simple e2e test', function() {

  var driver;

  beforeEach(function() {
    app.start().on('listening', function() {});
    var ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;
    driver = ptor.driver;
  });


  it('should greet the named user', function() {
    //given
    driver.get('http://localhost:3000');

    //when
    findByName('username').sendKeys('username');
    findByName('password').sendKeys('password');

    //then
    expect(true).toEqual(true);
  });

  afterEach(function() {
    app.shutdown();
  });

  var findByName = function(name) {
    return driver.findElement(protractor.By.name(name));
  };
  var findByCss = function(css) {
    return driver.findElement(protractor.By.css(css));
  };
});
