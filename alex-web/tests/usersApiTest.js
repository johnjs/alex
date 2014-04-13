var app = require('./app');
var request = require('./utils/request');

describe('Users API test', function () {

    var SAMPLE_USER = {
        username: 'test', password: 'testpass'
    };

    var _prepareDatabase = function () {
        app.users.save(SAMPLE_USER);
    };

    before(function (done) {
        _prepareDatabase();
        app.start().on('listening', done);
    });

    it('should expose users in the api', function (done) {
        //given

        //when
        request.get('/users', 200, done);

        //then
    });

    after(function (done) {
        app.shutdown(done);
    });

});

