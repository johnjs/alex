var app = require('./../app_test');
var request = require('./utils/request');
var expect = require('chai').expect;

describe('Users API test', function () {

    //given
    var SAMPLE_USER_1 = {
        username: 'test1',
        password: 'testpass',
        lessons: [
            {

                words:[
                    {
                        item:'hello',
                        translation:"witaj"
                    }
                ]
            }
        ]
    };

    var SAMPLE_USER_2 = {
        username: 'test2',
        password: 'testpass'
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
            expect(res.body[0].lessons).to.have.length(1);
            expect(res.body[0].lessons[0].words).to.have.length(1);

            done();
        });
    });

    after(function (done) {
        app.database._connection.collections['users'].drop(function (err) {
            app.shutdown(done);
        });
    });

});


