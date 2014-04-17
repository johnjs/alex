var mongoose = require('mongoose');

var wordsSchema = mongoose.Schema({
    username: 'string',
    lessonId: 'string',
    word: 'string',
    translation: 'string'
});

module.exports = wordsSchema;
