define([], function() {
  return function(Lessons) {
    return {
      restrict: 'E',
      scope: {
        lesson: '='
      },
      template: '<div class="row"><div class="col-md-2"><select ng-model="lesson" class="lesson-selector col-md-12" ng-options="l as l for l in lessons" ></select></div><div class="col-md-4"><lessoncreator add="addLesson(lessonName)"/><div></div>',
      link: function(scope, element, attr) {
        scope.lessons = [];
        scope.addLesson = function(lessonName) {
          scope.lessons.push(lessonName);
          scope.lesson = lessonName;
        };

        Lessons.findLessons().then(function(res) {
          scope.lessons = res.data;
          scope.lesson = scope.lessons[0];
        });
      }
    };
  };
});
