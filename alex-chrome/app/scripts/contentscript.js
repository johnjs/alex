window.addEventListener('load', function () {

    var app = angular.module('alex', []);

    var html = document.querySelector('html');
    html.setAttribute('ng-app', '');
    html.setAttribute('ng-csp', '');

    var alexElement = document.createElement("alex");
    alexElement.setAttribute('ng-controller', 'MainCtrl');

    var firstChildOfBody = document.body.children[0];
    document.body.appendChild(alexElement);
    document.body.insertBefore(alexElement, firstChildOfBody);

    app.controller("MainCtrl", function ($scope) {
        console.log('Main ctrl!');
        $scope.words = [];
    });

    var alexDirective = document.createElement("div");
    alexDirective.setAttribute('mydir', '');
    alexDirective.setAttribute('words', 'words');
    alexElement.appendChild(alexDirective);

    app.directive('mydir', function ($http) {
        return {
            restrict: "EA",
            scope: {
                words: '='
            },
            template: '<p class="bg-primary"><dl class="col-md-offset-2 col-md-6 dl-horizontal"><dt>{{ currentWord.word }}</dt><dd>{{ currentWord.translation }}</dd></dl></p>',
            link: function (scope, element, attr) {
                scope.$watch('words', function () {
                    _.each(scope.words, function (word, index) {
                        var x = function (wordToDisplay) {
                            scope.currentWord = wordToDisplay;
                            scope.$digest();
                        };
                        _.delay(x, 3000 * index, word)
                    })
                });
            }
        }
    });

    angular.bootstrap(html, ['alex'], []);

    chrome.extension.onMessage.addListener(function (request) {

        var scope = angular.element("alex").scope();
        scope.words = request.words;
        scope.$apply();

    });
});
