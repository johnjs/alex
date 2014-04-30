var Q = require('q');
var _ = require('underscore');
var UsersSchema = require('./UsersSchema');

var Users = function (database) {
    this.collection = database.model('Users', UsersSchema);
};

Users.prototype = {
    collection: null,

    save: function (usersData) {
        if (!this._validateIfAllFieldsAreSet(usersData)) {
            var errorPromise = Q.defer();
            errorPromise.reject("All fields of a model must be set");
            return errorPromise.promise;
        }

        var newUser = new this.collection(usersData);
        return Q.denodeify(newUser.save.bind(newUser))();
    },

    update: function (id, usersData) {

        if (!this._validateIfAnyAttributeIsNotSet(usersData)) {
            var errorPromise = Q.defer();
            errorPromise.reject("All fields of a model must be set");
            return errorPromise.promise;
        }

        return this.findOne({_id: id}).then(function (user) {
            user = _.extend(user, usersData);
            return Q.denodeify(user.save.bind(user))();
        });
    },

    find: function (usersData) {
        return Q.denodeify(this.collection.find.bind(this.collection))(usersData);
    },

    findOne: function (usersData) {
        return Q.denodeify(this.collection.findOne.bind(this.collection))(usersData);
    },


    //TODO[DoMi] Add a test
    remove: function (username) {
        return Q.denodeify(this.collection.findOneAndRemove.bind(this.collection))({username: username});
    },

    _validateIfAllFieldsAreSet: function (usersData) {
        var requiredAttrs = _.without(_.keys(UsersSchema.paths), '__v', '_id');
        return this._validateIfGivenAttributesAreSet(usersData, requiredAttrs);
    },

    _validateIfAnyAttributeIsNotSet: function (userData) {
        return this._validateIfGivenAttributesAreSet(userData, _.keys(userData));
    },

    _validateIfGivenAttributesAreSet: function (obj, attrs) {
        var isValid = true;

        _.each(attrs, function (key) {
            if (_.isNull(obj[key]) || _.isUndefined(obj[key])) {
                isValid = false;
            }
        });

        return isValid;
    }


};

module.exports = Users;

