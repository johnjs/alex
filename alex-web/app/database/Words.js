var Q = require('q');

var Words = function (database) {
    var wordsSchema = database.schema({
        username: 'string',
        lessonId: 'string',
        word: 'string',
        translation: 'string'
    });
    this.collection = database.model('Words', wordsSchema);
};

Words.prototype = {
    collection: null,

    save: function (wordsData) {
        var newWord = new this.collection(wordsData);
        return Q.denodeify(newWord.save.bind(newWord))();
    },

    find: function (filtering) {
        return Q.denodeify(this.collection.find.bind(this.collection))(filtering);
    }
};

module.exports = Words;

