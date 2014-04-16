var app = require('./../../app_test');
var requestUtils = require('./../utils/request');
var expect = require('chai').expect;
var Q = require('q');

describe('Users API test', function () {

    //given
    var SAMPLE_USER_1 = {
        username: 'test1',
        password: 'testpass'
    };

    var SAMPLE_USER_2 = {
        username: 'test2',
        password: 'testpass'
    };

    var _prepareDatabase = function () {
        return Q.all([
            app.users.save(SAMPLE_USER_1),
            app.users.save(SAMPLE_USER_2)
        ]);
    };

    var request;

    before(function (done) {
        app.start().on('listening', done);
        request = requestUtils(app.app);
    });

    beforeEach(function (done) {
        _prepareDatabase().then(function () {
            done();
        });
    });

    describe('Find', function () {
        it('should return all users', function (done) {
            //when
            request.post({}, '/users', 200, function (err, res) {

                //then
                expect(res.body).to.have.length(2);
                done();
            });
        });

        it('should return user with username "test1"', function (done) {
            //when
            request.post({username: 'test1'}, '/users', 200, function (err, res) {

                //then
                expect(res.body[0].username).to.be.equal(SAMPLE_USER_1.username);
                done();
            });
        });
    });

    describe('Create', function(){

    });


    afterEach(function (done) {
        app.database._connection.collections['users'].drop(done);
    });

    after(function (done) {
        app.shutdown(done);
    });

});


