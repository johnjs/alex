var logger = require('../app/utils/Logger');
var Response = require('../app/utils/Response');

module.exports = function (Users, Words) {

    var _extractWordsDataFromRequest = function (req) {
        return {
            username: req.body.username,
            lessonId: req.body.lessonId,
            word: req.body.word,
            translation: req.body.translation
        };
    };

    return {

        index: function (req, res) {
            res.render('index', { title: 'Express' });
        },

        findUsers: function (req, res) {
            var filtering = req.body || {};
            Users.find(filtering).then(function (users) {
                Response.okJson(users, res);
            }, function (err) {
                Response.badRequest(err, res);
            });
        },

        findWords: function (req, res) {
            var filtering = req.body || {};
            Words.find(filtering).then(function (words) {
                Response.okJson(words, res);
            }, function (err) {
                Response.badRequest(err, res);
            });
        },

        createWord: function (req, res) {
            var wordsData = _extractWordsDataFromRequest(req);

            Words.save(wordsData).then(function () {
                Response.ok("Word added!", res);
            }, function (err) {
                Response.badRequest(err, res);
            });
        },

        updateWord: function (req, res) {
            var wordId = req.params.id;
            var wordsData = _extractWordsDataFromRequest(req);

            Words.update(wordId, wordsData).then(function () {
                Response.ok("Word updated!", res);
            }, function (err) {
                Response.badRequest(err, res);
            });
        },

        removeWord: function (req, res) {
            var wordId = req.params.id;

            Words.remove(wordId).then(function () {
                Response.ok("Word removed!", res);
            }, function (err) {
                Response.badRequest(err, res);
            });
        }


    };

};