var logger = require('../app/utils/Logger');
var Response = require('../app/utils/Response');

module.exports = function (Users, Words) {

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
            var wordsData = {
                username: req.body.username,
                lessonId: req.body.lessonId,
                word: req.body.word,
                translation: req.body.translation
            };

            Words.save(wordsData).then(function () {
                Response.ok("Word added!", res);
            }, function (err) {
                Response.badRequest(err, res);
            });
        }

    };

};