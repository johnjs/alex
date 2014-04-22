var Q = require('q');
var expect = require('chai').expect;
var _ = require('underscore');

var Words = require('../../../app/database/Words');
var database = require('../utils/TestDatabase');

describe('Words collection', function () {

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

    var DATABASE_WORD = null;

    var _prepareDatabase = function () {
        return Q.all([ cut.save(SAMPLE_WORD_1).then(function (word) {
            DATABASE_WORD = word;
        }), cut.save(SAMPLE_WORD_2), cut.save(SAMPLE_WORD_3) ]);
    };

    var cut;

    beforeEach(function (done) {
        cut = new Words(database);
        _prepareDatabase().then(function () {
            done();
        });
    });

    var expectWordsToBeEqual = function (w1, w2) {
        var keys = ['username', 'lessonId', 'word', 'translation'];
        _.each(keys, function (key) {
            expect(w1[key]).to.equal(w2[key]);
        });
    };

    describe('Find', function () {
        it('should return all words', function (done) {
            //when
            cut.find().then(function (words) {

                expect(words).to.have.length(3);
                done();
            });
        });

        it('should return words of user "user1"', function (done) {
            //when
            cut.find({username: 'user1'}).then(function (words) {

                //then
                expect(words).to.have.length(2);

                done();
            });
        });

        it('should return words of user "user1" from lesson "lesson1"', function (done) {
            //when
            cut.find({username: 'user1', lessonId: 'lesson1'}).then(function (words) {

                //then
                expect(words).to.have.length(1);
                expectWordsToBeEqual(words[0], SAMPLE_WORD_1);
                done();
            });
        });
    });

    describe('Create', function () {
        it('should create a new word', function (done) {
            //given
            var wordToSave = {
                username: 'user1',
                lessonId: 'lesson1',
                word: 'dinner',
                translation: 'obiad'
            };

            //when
            cut.save(wordToSave).then(function (words) {

                //then
                expectWordsToBeEqual(words[0], wordToSave);
                done();
            });
        });
        it('should return an error when some attributes are not set', function (done) {
            //given
            var toSave = {
                username: 'user',
                lessonId: 'lesson',
                word: 'w'
            };

            //when
            cut.save(toSave).then(function () {
            }, function (err) {
                done();
            });
        });

        it('should return an error when some attributes have null values', function (done) {
            //given
            var toSave = {
                username: 'user',
                lessonId: 'lesson',
                word: 'w',
                translation: null
            };

            //when
            cut.save(toSave).then(function () {
            }, function (err) {
                done();
            });
        });

    });

    describe('Update', function () {
        it('should update existing word', function (done) {
            //given
            var word = {
                translation: 'czesc'
            };

            //when
            cut.update(DATABASE_WORD._id, word).then(function (raw) {
                var numberOfAffected = raw[0];

                expect(numberOfAffected).to.equal(1);

                cut.find({_id: DATABASE_WORD._id}).then(function (words) {
                    expect(words).to.have.length(1);
                    expect(words[0].translation).to.equal(word.translation);
                });

                done();
            });

        });

        it('should not update existing word with undefined attribute', function (done) {
            //given
            var word = {
                translation: undefined
            };

            //when
            cut.update(DATABASE_WORD._id, word).then(function (raw) {
            }, function (err) {
                expect(err.name).to.equal('CastError');
                done();
            });
        });

        it('should not allow to update an _id of existing word', function (done) {
            //given
            var word = {
                _id: '1234'
            };

            //when
            cut.update(DATABASE_WORD._id, word).then(function (raw) {
            }, function (err) {
                expect(err.name).to.equal('CastError');
                done();
            });
        });
    });

    describe('Remove', function () {
        it('should remove existing word', function (done) {
            //given

            //when
            cut.remove(DATABASE_WORD._id).then(function () {
                cut.find({_id: DATABASE_WORD._id}).then(function (words) {

                    //then
                    expect(words.length).to.equal(0);
                    done();
                });
            });

        });
    });

    describe('Lessons', function () {
        it('should return lessons of a given user', function (done) {
            //when
            cut.findLessons(SAMPLE_WORD_3.username).then(function (lessons) {

                //then
                expect(lessons).to.deep.equal([SAMPLE_WORD_3.lessonId]);
                done();
            });

        });
    });

    afterEach(function (done) {
        database._connection.collections['words'].drop(function (err) {
            done();
        });
    });

})
;


