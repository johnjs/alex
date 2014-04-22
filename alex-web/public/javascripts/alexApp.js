define(['angular', 'controllers/MainCtrl', 'factories/Lessons', 'directives/lessons', 'directives/words','directives/word', 'angular-route'], function (angular, MainCtrl, Lessons, lessons, words, word) {
    var app = angular.module('alexApp', ['ngRoute']);

    app.controller('MainCtrl', MainCtrl).
        factory('Lessons', Lessons).
        directive('lessons', lessons).
        directive('words', words).
        directive('word', word);

    return app;
});