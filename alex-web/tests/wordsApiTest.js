var app = require('./../app_test');
var request = require('./utils/request');
var expect = require('chai').expect;
var Q = require('Q');

describe('Words API test', function () {

    //given
    var SAMPLE_WORD_1 = {
        username: 'user1',
        lessonId: 'lesson1',
        word: 'hello',
        translation: 'witaj'
    };

    var SAMPLE_WORD_2 = {
        username: 'user1',
        lessonId: 'lesson2',
        word: 'see you',
        translation: 'do zobaczenia'
    };

    var SAMPLE_WORD_3 = {
        username: 'user2',
        lessonId: 'lesson1',
        word: 'mistake',
        translation: 'blad'
    };

    var _prepareDatabase = function () {
        return Q.all([
                app.words.save(SAMPLE_WORD_1),
                app.words.save(SAMPLE_WORD_2),
                app.words.save(SAMPLE_WORD_3)]
        );
    };

    before(function (done) {
        _prepareDatabase().then(function () {
            app.start().on('listening', done);
        });
    });

    it('should return all words', function (done) {
        //when
        request.post({}, '/words', 200, function (err, res) {

            //then
            expect(res.body).to.have.length(3);
            done();
        });
    });

    it('should return words of user "user1"', function (done) {
        //when
        request.post({username: 'user1'}, '/words', 200, function (err, res) {

            //then
            expect(res.body).to.have.length(2);
            done();
        });
    });

    it('should return words of user "user1" from lesson "lesson1"', function (done) {
        //when
        request.post({username: 'user1', lessonId: 'lesson1'}, '/words', 200, function (err, res) {

            //then
            expect(res.body).to.have.length(1);
            done();
        });
    });

    after(function (done) {
        app.database._connection.collections['words'].drop(function (err) {
            app.shutdown(done);
        });
    });

});


