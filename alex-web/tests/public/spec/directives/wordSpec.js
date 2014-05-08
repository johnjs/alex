define(['$', 'alexApp', 'angular', 'angular-mocks'], function($) {
  describe('Word directive', function() {

    var element;
    var scope;

    beforeEach(module('alexApp'));

    beforeEach(inject(function($compile, $rootScope, Word) {
      scope = $rootScope.$new();
      scope.remove = function() {};
      spyOn(scope, 'remove');

      scope.wordToBeRemoved = new Word({
        word: 'hello',
        _id: 1
      });

      element = angular.element('<tr word="wordToBeRemoved" remove="remove(word)"></word>');
      $compile(element)(scope);
    }));

    it('should invoke a remove method', function() {
      //given
      scope.$digest();

      //when
      element.isolateScope().remove({
        word: element.isolateScope().word
      });

      //then
      expect(scope.remove).toHaveBeenCalledWith(scope.wordToBeRemoved);
    });

  });
});
