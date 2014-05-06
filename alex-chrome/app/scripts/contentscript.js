function buildDOMStructure() {
  var $body = $('body');
  var $container = $('<alex ng-app="" ng-csp=""></alex>');
  var $ctrlElement = $('<alexCtrl ng-controller="AlexCtrl"></alexCtrl>');
  var $alexDirective = $('<wordsbar  words="words"></wordsbar>');

  $body.prepend($container);
  $container.prepend($ctrlElement);
  $ctrlElement.prepend($alexDirective);

  return $container;
}

window.addEventListener('load', function() {

  var $appContainer = buildDOMStructure();
  var app = angular.module('alex', []);

  app.controller('AlexCtrl', function($scope) {
    $scope.words = [];
  });

  app.directive('wordsbar', function() {
    return {
      restrict: 'E',
      scope: {
        words: '='
      },
      template: '<p class="bg-primary"><dl class="col-md-offset-2 col-md-6 dl-horizontal"><dt>{{ currentWord.word }}</dt><dd>{{ currentWord.translation }}</dd></dl></p>',
      link: function(scope, element, attr) {
        scope.$watch('words', function() {
          _.each(scope.words, function(word, index) {
            var x = function(wordToDisplay) {
              scope.currentWord = wordToDisplay;
              scope.$digest();
            };
            _.delay(x, 3000 * index, word);
          });
        });
      }
    };
  });

  angular.bootstrap($appContainer, ['alex'], []);

  chrome.extension.onMessage.addListener(function(request) {
    var scope = angular.element('alexCtrl').scope();
    scope.words = request.words;
    scope.$apply();
  });

});
