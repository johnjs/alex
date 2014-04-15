var Q = require('q');
var _ = require('underscore');

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
        if (!this._validateIfAllFieldsAreSet(wordsData)) {
            var errorPromise = Q.defer();
            errorPromise.reject("All fields of a model must be set");
            return errorPromise.promise;
        }

        var newWord = new this.collection(wordsData);
        return Q.denodeify(newWord.save.bind(newWord))();
    },

    _validateIfAllFieldsAreSet: function (wordsData) {
        return _.all(_.values(wordsData), function (value) {
            return !_.isNull(value) && !_.isUndefined(value);
        });
    },

    find: function (filtering) {
        return Q.denodeify(this.collection.find.bind(this.collection))(filtering);
    }
};

module.exports = Words;

