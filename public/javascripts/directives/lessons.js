define(['_'], function(_) {
  return function(Lesson) {
    return {
      restrict: 'E',
      scope: {
        lesson: '='
      },
      templateUrl: 'views/partials/lessons',
      link: function(scope) {
        scope.lessons = [];
        scope.addLesson = function(lessonId) {
          scope.lesson = new Lesson(lessonId);
          scope.lessons.push(scope.lesson);
        };

        Lesson.findLessons().then(function(lessons) {
          scope.lessons = lessons;
          if (!_.isEmpty(scope.lessons)) {
            scope.lesson = _.first(scope.lessons);
          }
        });
      }
    };
  };
});
