define(['_'], function (_) {
    return function (Lessons, Words) {
        return {
            restrict: "E",
            scope: {
                lesson: '='
            },
            templateUrl: "views/partials/words",
            link: function (scope, element, attr) {
                scope.remove = function (word) {
                    Words.remove(word).then(function () {
                        scope.words.splice(scope.words.indexOf(word), 1);
                    });
                };

                scope.add = function (word, translation) {
                    var word = {
                        lessonId: scope.lesson,
                        word: word,
                        translation: translation
                    };

                    Words.add(word).then(function (res) {
                        scope.words.push(res.data[0]);
                    });
                };

                scope.refreshWords = function () {
                    if (!_.isNull(scope.lesson) && !_.isUndefined(scope.lesson)) {
                        Lessons.findWords(scope.lesson).then(function (res) {
                            scope.words = res.data;
                        });
                    }
                };

                scope.$watch('lesson', function () {
                    scope.refreshWords();
                });
            }
        };
    };
});