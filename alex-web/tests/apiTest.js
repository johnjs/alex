var app = require('./../app_test');
var request = require('./utils/request');

describe('Basic API test', function () {

    before(function (done) {
        app.start().on('listening', done);
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

