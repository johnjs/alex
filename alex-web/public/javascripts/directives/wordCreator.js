define([], function () {
    return function () {
        return {
            restrict: "E",
            scope: {
                add: "&"
            },
            templateUrl: "views/partials/wordCreator",
            link: function (scope) {
                scope.formSubmitAction = function () {
                    scope.add({word: scope.word, translation: scope.translation}).then(function () {
                        scope.word = "";
                        scope.translation = "";
                    });
                };
            }
        };
    };
});