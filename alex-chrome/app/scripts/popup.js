var app = angular.module('alexChrome', ['ngRoute']);

app.factory('Lessons', function ($http) {
    return {
        findLessons: function () {
            return $http({
                data: {},
                method: 'POST'
            });
        },
        findWords: function (lessonId) {
            return $http({
                data: {
                    lessonId: lessonId
                },
                method: 'POST'
            });
        }
    }
});

app.directive('lessons', function (Lessons) {
    return {
        restrict: 'E',
        scope: {
            lesson: "="
        },
        template: '<div class="row"><div class="col-md-2"><select ng-model="lesson" class="lesson-selector col-md-12" ng-options="l as l for l in lessons" ></select></div>',
        link: function (scope) {
            Lessons.findLessons().then(function (res) {
                scope.lessons = res.data;
                scope.lesson = scope.lessons[0];
            });
        }
    };
})

app.controller('MainCtrl', function ($scope, Lessons) {
    $scope.lesson = '';
    $scope.getWords = function () {
        Lessons.findWords($scope.lesson).then(function (res) {
            chrome.tabs.getSelected(null, function (tab) {
                chrome.tabs.sendMessage(tab.id, {words: res.data });
            });
        });
    };
});

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'main.html'
        }).
        otherwise({
            redirectTo: '/'
        });
}])