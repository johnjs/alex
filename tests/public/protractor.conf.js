exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/**/*.js'],
  includeStackTrace: true,
  jasmineNodeOpts: {
    showColors: true
  },
  capabilities: {
    'browserName': 'phantomjs'
  },
  'phantomjs.binary.path': '../../node_modules/phantomjs/bin/phantomjs',
  'phantomjs.cli.args': ['--logfile=PATH', '--loglevel=DEBUG']

  //[DoMi] Protractor configuration for Chrome
  //    seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar',
  //    chromeOnly: false,
  //    chromeDriver: '../../node_modules/protractor/selenium/chromedriver'

};
