define([], function () {
    return function () {
        return {
            restrict: "E",
            templateUrl: "views/partials/lessonCreator",
            scope: {
                add: "&"
            },
            link: function (scope, element, attr) {
                scope.isFormVisible = false;
                scope.lessonName = "";

                scope.addLesson = function () {
                    scope.add({lessonName: scope.lessonName});
                    scope.lessonName = "";
                    scope.isFormVisible = false;
                };

                scope.abort = function () {
                    scope.lessonName = "";
                    scope.isFormVisible = false;
                }
            }
        };
    };
});