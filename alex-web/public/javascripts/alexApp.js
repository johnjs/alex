define(['angular', 'controllers/MainCtrl', 'factories/Lessons', 'factories/Words', 'directives/lessons', 'directives/words', 'directives/word', 'directives/lessonCreator', 'directives/wordCreator', 'angular-route', 'angular-animate'], function (angular, MainCtrl, Lessons, Words, lessons, words, word, lessonCreator, wordCreator) {
    var app = angular.module('alexApp', ['ngRoute', 'ngAnimate']);

    app.controller('MainCtrl', MainCtrl).
        factory('Lessons', Lessons).
        factory('Words', Words).
        directive('lessons', lessons).
        directive('words', words).
        directive('word', word).
        directive('lessoncreator', lessonCreator).
        directive('wordcreator', wordCreator);


    return app;
});