define(['_'], function(_) {
  return function($http, Word) {

    var Lesson = function(lessonId) {
      this.id = lessonId;
    };

    Lesson.findLessons = function() {
      return $http({
        url: '/lessons',
        data: {},
        method: 'POST'
      }).then(function(response) {
        return _.map(response.data, function(lessonId) {
          return new Lesson(lessonId);
        });
      });
    };

    Lesson.prototype.findWords = function() {
      var lesson = this;
      return $http({
        url: '/words',
        data: {
          lessonId: lesson.id
        },
        method: 'POST'
      }).then(function(response) {
        return _.map(response.data, function(wordsData) {
          return new Word(wordsData);
        });
      });
    };

    return Lesson;
  };
});
