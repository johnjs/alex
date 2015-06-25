define([], function() {
  return function() {
    return {
      restrict: "E",
      templateUrl: "views/partials/lessonCreator",
      scope: {
        add: "&"
      },
      link: function(scope) {
        scope.isFormVisible = false;
        scope.lessonId = "";

        scope.addLesson = function() {
          scope.add({
            lessonId: scope.lessonId
          });
          scope.lessonId = "";
          scope.isFormVisible = false;
        };

        scope.abort = function() {
          scope.lessonId = "";
          scope.isFormVisible = false;
        };
      }
    };
  };
});
