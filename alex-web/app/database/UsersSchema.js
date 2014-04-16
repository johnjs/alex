var mongoose = require('mongoose');
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');
var SALT_FACTOR = 10;

var UsersSchema = mongoose.Schema({
    username: 'string',
    password: 'string'
});

UsersSchema.methods.comparePassword = function (candidatePassword) {
    return Q.denodeify(bcrypt.compare.bind(this))(candidatePassword, this.password);
};

var preSaveAndUpdateAction = function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    Q.denodeify(bcrypt.genSalt)(SALT_FACTOR).then(function (salt) {
        return salt;
    }).then(function (salt) {
        return Q.denodeify(bcrypt.hash)(user.password, salt, null);
    }).then(function (hash) {
        user.password = hash;
        next();
    });

};

UsersSchema.pre('save', preSaveAndUpdateAction);

module.exports = UsersSchema;