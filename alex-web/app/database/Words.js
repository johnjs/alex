var Q = require('q');
var _ = require('underscore');
var mongoose = require('mongoose');
var wordsSchema  = require('./WordsSchema');

var Words = function (database) {
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

    update: function (id, wordsData) {
        return Q.denodeify(this.collection.update.bind(this.collection))(id, wordsData);
    },

    remove: function (id) {
        return Q.denodeify(this.collection.findByIdAndRemove.bind(this.collection))(id);
    },

    find: function (filtering) {
        return Q.denodeify(this.collection.find.bind(this.collection))(filtering);
    },

    _validateIfAllFieldsAreSet: function (wordsData) {
        var requiredAttrs = _.without(_.keys(wordsSchema.paths), '__v', '_id');
        var isValid = true;

        _.each(requiredAttrs, function(key){
            if(_.isNull(wordsData[key]) || _.isUndefined(wordsData[key])){
                isValid = false;
            }
        });

        return isValid;
    }
};

module.exports = Words;

