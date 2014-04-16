var app = require('./../../app_test');
var requestUtils = require('./../utils/request');


describe('Basic API test', function () {

    var request;

    before(function (done) {
        app.start().on('listening', done);
        request = requestUtils(app.app);
    });

    it('should expose core route in the api', function (done) {
        //given

        //when
        request.get('/', 200, done);

        //then
    });

    after(function (done) {
        app.shutdown(done);
    });

});

