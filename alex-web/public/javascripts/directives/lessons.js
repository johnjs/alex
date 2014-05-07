define(['_'], function(_) {
  return function(Lessons) {
    return {
      restrict: 'E',
      scope: {
        lesson: '='
      },
      templateUrl: 'views/partials/lessons',
      link: function(scope, element, attr) {
        scope.lessons = [];
        scope.addLesson = function(lessonName) {
          scope.lessons.push(lessonName);
          scope.lesson = lessonName;
        };

        Lessons.findLessons().then(function(res) {
          scope.lessons = res.data;
          if (!_.isEmpty(scope.lessons)) {
            scope.lesson = _.first(scope.lessons);
          }
        });
      }
    };
  };
});
