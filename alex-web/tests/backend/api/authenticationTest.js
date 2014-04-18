var app = require('./../../../app_test');
var requestUtils = require('./../utils/request');
var expect = require('chai').expect;


var expectCurrentLocation = function (res, expectedLocation) {
    expect(res.header.location).to.equal(expectedLocation);
};

describe('Authentication test', function () {

    var request;

    before(function (done) {
        app.start().on('listening', done);
        request = requestUtils(app.app);
    });

    describe('Without authentication', function () {
        it('should expose /login route in the api', function (done) {
            //when                    //then
            request.get('/login', 200, done);
        });

        it('should not expose index route in the api if user is not logged in', function (done) {
            //when
            request.get('/', 302, function (req, res) {

                //then
                expectCurrentLocation(res, '/login');
                done();
            });
        });
    });

    describe('With authentication', function () {

        //given
        var USER = {
            username: 'user',
            password: 'pass'
        };

        before(function (done) {
            app.users.save(USER).then(function () {
                done();
            });
        });

        it('should authenticate user', function (done) {
            //when
            request.post(USER, '/login', 302, function (req, res) {

                //then
                expectCurrentLocation(res, '/');
                done();
            });
        });

        it('should not authenticate user because of a not correct password', function (done) {
            var USER_WITH_INCORRECT_PASSWORD = {
                username: USER.username,
                password: 'incorrect password'
            };

            //when
            request.post(USER_WITH_INCORRECT_PASSWORD, '/login', 302, function (req, res) {

                //then
                expectCurrentLocation(res, '/login');
                //TODO [DoMi] Check messages
                done();
            });
        });

        it('should not authenticate not existing user', function (done) {
            var NOT_EXISTING_USER = {
                username: 'thereIsNoSuchUser',
                password: USER.password
            };

            //when
            request.post(NOT_EXISTING_USER, '/login', 302, function (req, res) {

                //then
                expectCurrentLocation(res, '/login');
                //TODO [DoMi] Check messages
                done();
            });
        });

        it('should log in and log out user', function (done) {
            //when an user is successfully authenticated
            request.post(USER, '/login', 302, function (req, res) {

                //then he should be redirected to the main page
                expectCurrentLocation(res, '/');

                //when he logs out
                request.get('/logout', 302, function (req, res) {

                    //then he should be moved to /login page
                    expectCurrentLocation(res, '/login');

                    //when he tries to go the main page again
                    request.get('/', 302, function (req, res) {

                        //then he should be redirected to login page because he's not logged in
                        expectCurrentLocation(res, '/login');
                        done();
                    });
                });
            });
        });

        after(function (done) {
            app.database._connection.collections['users'].drop(done);
        });
    });


    after(function (done) {
        app.shutdown(done);
    });

});

