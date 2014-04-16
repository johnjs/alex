var expect = require('chai').expect;
var _ = require('underscore');

var Users = require('../../app/database/Users');
var database = require('../utils/TestDatabase');


describe('Users collection', function () {

    var cut;
    var SAMPLE_USER;
    var SAMPLE_USER_DATA = {
        username: 'sampleUser',
        password: 'password'
    };

    before(function (done) {
        cut = new Users(database);
        done();
    });

    beforeEach(function (done) {
        cut.save(SAMPLE_USER_DATA).then(function (users) {
            SAMPLE_USER = _.first(users);
            done();
        });
    });

    describe('Create', function () {

        it('should hash a password before it saves an user in a database', function (done) {
            //given
            var usersData = {
                username: 'user',
                password: 'notHashedString'
            };

            //when
            cut.save(usersData).then(function () {
                cut.findOne({username: usersData.username}).then(function (user) {

                    //then
                    expect(user.username).to.equal(usersData.username);
                    expect(user.password).to.not.equal(usersData.password);

                    user.comparePassword(usersData.password).then(function (doesMatch) {
                        //then
                        expect(doesMatch).to.equal(true);
                        done();
                    });


                });
            });
        });

    });

    describe('Update', function () {
        it('should hash a password before it updates an user in a database', function (done) {
            //given
            SAMPLE_USER_DATA.password = 'differentPassword';

            //when
            cut.update(SAMPLE_USER._id, SAMPLE_USER_DATA).then(function (users) {
                var updatedUser = _.first(users);
                updatedUser.comparePassword(SAMPLE_USER_DATA.password).then(function (doesMatch) {

                    //then
                    expect(doesMatch).to.equal(true);
                    done();
                });
            });
        });

        it('should not hash a password before it updates an user whose password has not been modified', function (done) {
            //given
            var userData = {
                username: 'differentUsername',
                password: SAMPLE_USER.password
            };

            //when
            cut.update(SAMPLE_USER._id, userData).then(function (users) {
                var updatedUser = _.first(users);

                //then
                expect(updatedUser.password).to.equal(SAMPLE_USER.password);
                done();
            });
        });

        it('should not set undefined values', function (done) {
            //given
            var userData = {
                username: undefined,
                password: SAMPLE_USER.password
            };

            //when
            cut.update(SAMPLE_USER._id, userData).then(function (users) {
                var updatedUser = _.first(users);

                //then
                expect(updatedUser.username).to.equal(SAMPLE_USER.username);
                expect(updatedUser.password).to.equal(SAMPLE_USER.password);

                done();
            });
        });

        it('should not override the _id', function (done) {
            //given
            var userData = {
                _id: 'idWhichShouldNotOverrideExistingOne'
            };

            //when
            cut.update(SAMPLE_USER._id, userData).then(function (users) {
                var updatedUser = _.first(users);

                //then
                expect(updatedUser.username).to.equal(SAMPLE_USER.username);
                expect(updatedUser.password).to.equal(SAMPLE_USER.password);

                done();
            });
        });
    });

    describe('Compare passwords', function () {
        it('password should match for a given user', function (done) {

            //when
            SAMPLE_USER.comparePassword(SAMPLE_USER_DATA.password).then(function (doesMatch) {
                //then
                expect(doesMatch).to.equal(true);
                done();
            });

        });

        it('passwords should not match for a given user', function (done) {
            //when
            SAMPLE_USER.comparePassword(SAMPLE_USER_DATA.password.toUpperCase()).then(function (doesMatch) {

                //then
                expect(doesMatch).to.equal(false);
                done();
            });

        });
    });


    afterEach(function (done) {
        database._connection.collections['users'].drop(done);
    });

});