var app = require('./../app_test');
var request = require('./utils/request');
var expect = require('chai').expect;

describe('Users API test', function () {

    //given
    var SAMPLE_USER_1 = {
        username: 'test1', password: 'testpass'
    };

    var SAMPLE_USER_2 = {
        username: 'test1', password: 'testpass'
    };

    var _prepareDatabase = function () {
        app.users.save(SAMPLE_USER_1);
        app.users.save(SAMPLE_USER_2);
    };

    before(function (done) {
        _prepareDatabase();
        app.start().on('listening', done);
    });

    it('should return all users', function (done) {
        //when
        request.post({}, '/users', 200, function(err, res){

            //then
            expect(res.body).to.have.length(2);
            done();
        });
    });

    it('should return user with username "test1"', function (done) {
        //when
        request.post({username: 'test1'}, '/users', 200, function(err, res){

            //then
            expect(res.body[0].username).to.be.equal(SAMPLE_USER_1.username);
            done();
        });
    });

    after(function (done) {
        app.database._connection.collections['users'].drop( function(err) {
            app.shutdown(done);
        });

    });

});

