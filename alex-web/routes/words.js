var logger = require('../app/utils/Logger');
var Response = require('../app/utils/Response');

module.exports = function(Words) {

  var _extractWordsDataFromRequest = function(req) {
    return {
      username: req.session.passport.user,
      lessonId: req.body.lessonId,
      word: req.body.word,
      translation: req.body.translation
    };
  };

  return {

    findWords: function(req, res) {
      var filtering = req.body || {};
      Words.find(filtering).then(function(words) {
        Response.okJson(words, res);
      }, function(err) {
        Response.badRequest(err, res);
      });
    },

    createWord: function(req, res) {
      var wordsData = _extractWordsDataFromRequest(req);

      Words.save(wordsData).then(function(data) {
        Response.okJson(data, res);
      }, function(err) {
        Response.badRequest(err, res);
      });
    },

    updateWord: function(req, res) {
      var wordId = req.params.id;
      var wordsData = _extractWordsDataFromRequest(req);

      Words.update(wordId, wordsData).then(function() {
        Response.ok("Word updated!", res);
      }, function(err) {
        Response.badRequest(err, res);
      });
    },

    removeWord: function(req, res) {
      var wordId = req.params.id;

      Words.remove(wordId).then(function() {
        Response.ok("Word removed!", res);
      }, function(err) {
        Response.badRequest(err, res);
      });
    },

    findLessons: function(req, res) {
      var username = req.session.passport.user;
      Words.findLessons(username).then(function(lessons) {
        Response.okJson(lessons, res);
      }, function(err) {
        Response.badRequest(err, res);
      });
    }
  };
};
