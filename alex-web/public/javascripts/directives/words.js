define(['_'], function(_) {
  return function(Lesson, Word) {
    return {
      restrict: "E",
      scope: {
        lesson: '='
      },
      templateUrl: "views/partials/words",
      link: function(scope) {
        scope.remove = function(word) {
          word.remove().then(function() {
            scope.words.splice(scope.words.indexOf(word), 1);
          });
        };

        scope.add = function(word, translation) {
          var wordToAdd = {
            lessonId: scope.lesson.id,
            word: word,
            translation: translation
          };

          var newWord = new Word(wordToAdd);
          return newWord.create().then(function(createdWord) {
            scope.words.push(createdWord);
          });
        };

        scope.refreshWords = function() {
          if (!_.isNull(scope.lesson) && !_.isUndefined(scope.lesson)) {
            scope.lesson.findWords().then(function(words) {
              scope.words = words;
            });
          }
        };

        scope.$watch('lesson', function() {
          scope.refreshWords();
        });
      }
    };
  };
});
