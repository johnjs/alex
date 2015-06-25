var protractor = require('protractor');
var driver = protractor.getInstance().driver;

exports.findByName = function(name) {
  return driver.findElement(protractor.By.name(name));
};
exports.findByCss = function(name) {
  return driver.findElement(protractor.By.name(name));
};
