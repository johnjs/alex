var logger = require('../app/utils/Logger');

module.exports = function (Users, Words) {

    return {
        index: function (req, res) {
            res.render('index', { title: 'Express' });
        },

        findUsers: function (req, res) {
            var filtering = req.body || {};
            Users.find(filtering).then(function (users) {
                res.send(users);
            }, function (err) {
                logger.logError(err);
            });
        },

        findWords: function (req, res) {
            var filtering = req.body || {};
            Words.find(filtering).then(function (words) {
                res.send(words);
            }, function (err) {
                logger.logError(err);
            });
        }
    };

};