define(['angular', 'controllers/MainCtrl', 'factories/Lesson', 'factories/Word', 'directives/lessons', 'directives/words', 'directives/word', 'directives/lessonCreator', 'directives/wordCreator', 'angular-route', 'angular-animate'], function(angular, MainCtrl, Lesson, Word, lessons, words, word, lessonCreator, wordCreator) {
  var app = angular.module('alexApp', ['ngRoute', 'ngAnimate']);

  app.controller('MainCtrl', MainCtrl).
  factory('Lesson', Lesson).
  factory('Word', Word).
  directive('lessons', lessons).
  directive('words', words).
  directive('word', word).
  directive('lessoncreator', lessonCreator).
  directive('wordcreator', wordCreator);


  return app;
});
