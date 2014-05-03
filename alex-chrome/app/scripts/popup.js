var app = angular.module('alexChrome', ['ngRoute']);

app.factory('Lessons', function ($http) {
    return {
        findLessons: function () {
            return $http({
                url: 'http://localhost:3000/lessons',
                data: {},
                method: 'POST'
            });
        },
        findWords: function (lessonId) {
            return $http({
                url: 'http://localhost:3000/words',
                data: {
                    lessonId: lessonId
                },
                method: 'POST'
            });
        }
    };
});

app.directive('lessons', function (Lessons) {
    return {
        restrict: 'E',
        scope: {
            lesson: "="
        },
        template: '<div class="row"><div class="col-md-2">Select lesson:<select ng-model="lesson" class="lesson-selector col-md-12" ng-options="l as l for l in lessons" ></select></div>',
        link: function (scope) {
            Lessons.findLessons().then(function (res) {
                scope.lessons = res.data;
                scope.lesson = scope.lessons[0];
            });
        }
    };
});

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

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'main.html'
        }).
        when('/login', {
            controller: 'LoginCtrl',
            templateUrl: 'login.html'
        }).
        otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            'responseError': function (rejection) {
                if (rejection.status === 401) {
                    $location.url('/login');
                }
                return $q.reject(rejection);
            }
        };
    });
}]);

