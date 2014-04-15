var Q = require('q');

var Users = function (database) {

    var wordSchema = database.schema({
        item: 'string',
        translation: 'string'
    });

    var lessonSchema = database.schema({
        words: [wordSchema]
    });

    var usersSchema = database.schema({
        username: 'string',
        password: 'string',
        lessons: [lessonSchema]
    });

    this.collection = database.model('Users', usersSchema);
};

Users.prototype = {
    collection: null,

    save: function (usersData) {
        new this.collection(usersData).save();
    },

    find: function (usersData) {
        return Q.denodeify(this.collection.find.bind(this.collection))(usersData);
    }
};

module.exports = Users;

