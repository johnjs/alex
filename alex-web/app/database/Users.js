var Q = require('q');
var _ = require('underscore');
var UsersSchema = require('./UsersSchema');

var Users = function (database) {
    this.collection = database.model('Users', UsersSchema);
};

Users.prototype = {
    collection: null,

    save: function (usersData) {
        var newUser = new this.collection(usersData);
        return Q.denodeify(newUser.save.bind(newUser))();
    },

    update: function (id, usersData) {

        //TODO [DoMi] check why _.omit does not work
        var dataToUpdate = {};
        _.each(usersData, function (value, key) {
            if (value && key !== '_id') {
                dataToUpdate[key] = value;
            }
        });

        return this.findOne({_id: id}).then(function (user) {
            user = _.extend(user, dataToUpdate);
            return Q.denodeify(user.save.bind(user))();
        });
    },

    find: function (usersData) {
        return Q.denodeify(this.collection.find.bind(this.collection))(usersData);
    },

    findOne: function (usersData) {
        return Q.denodeify(this.collection.findOne.bind(this.collection))(usersData);
    }
};

module.exports = Users;

