var Q = require('q');

var Users = function (database) {

    var usersSchema = database.schema({
        username: 'string',
        password: 'string'
    });

    this.collection = database.model('Users', usersSchema);
};

Users.prototype = {
    collection: null,

    save: function (usersData) {
        var newUser = new this.collection(usersData);
        return Q.denodeify(newUser.save.bind(newUser))();
    },

    find: function (usersData) {
        return Q.denodeify(this.collection.find.bind(this.collection))(usersData);
    }
};

module.exports = Users;

