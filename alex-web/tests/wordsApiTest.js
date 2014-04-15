var app = require('./../app_test');
var requestUtils = require('./utils/request');
var expect = require('chai').expect;
var Q = require('q');

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

    var request;

    before(function (done) {
        _prepareDatabase().then(function () {
            app.start().on('listening', done);
            request = requestUtils(app.app);
        });
    });

    describe('Find', function () {
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
    });

    describe('Create', function () {
        it('should create a new word', function (done) {
            //given
            var word = {
                username: 'user1',
                lessonId: 'lesson1',
                word: 'dinner',
                translation: 'obiad'
            };

            //when -> then expect response
            request.put(word, '/words', 200, done);
        });

        it('should return an error if any of word attributes is not set', function (done) {
            //given
            var word = {
                username: 'user1',
                lessonId: 'lesson1',
                translation: 'obiad'
            };

            //when -> then expect response
            request.put(word, '/words', 400, done);
        });

    });

    describe('Update', function () {
        it('should update existing word', function (done) {
            //given
            var word = {
                word: 'hello',
                translation: 'witaj'
            };

            //when - find existing word
            app.words.find({username: 'user1', lessonId: 'lesson1'}).then(function(wordsBeforeUpdate){
                var oldWord = wordsBeforeUpdate[0];


                //then - update its attributes
                request.post(word, '/words/'+oldWord._id, 200, function(){

                    //then - find that word again
                    app.words.find({_id:oldWord._id}).then(function(wordsAfterUpdate){
                        var actualWord = wordsAfterUpdate[0];

                        //then - check if a value of a given attribute has changed
                        expect(actualWord.translation).to.equal(word.translation);

                        done();

                    });

                });

            });

        });

    });

    after(function (done) {
        app.database._connection.collections['words'].drop(function (err) {
            app.shutdown(done);
        });
    });

});


