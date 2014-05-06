define(['$', 'alexApp', 'angular', 'angular-mocks'], function($) {
  describe('Word directive', function() {

    var element;
    var scope;

    beforeEach(module('alexApp'));

    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.remove = function() {};
      spyOn(scope, 'remove');

      scope.wordToBeRemoved = {
        word: 'hello',
        _id: 1
      };

      element = angular.element('<tr word="w" remove="remove(wordToBeRemoved)"></word>');
      $compile(element)(scope);
    }));

    it('should invoke a remove method', function() {
      //given
      scope.$digest();

      //when
      clickOnElement(element.find('span')[0]);

      //then
      expect(scope.remove).toHaveBeenCalledWith(scope.wordToBeRemoved);
    });

    var clickOnElement = function(el) {
      var evObj = document.createEvent('Events');
      evObj.initEvent('click', true, false);
      el.dispatchEvent(evObj);
    };

  });
});
