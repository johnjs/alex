define(['alexApp', 'views/partials/lessonCreator.jade', 'angular', 'angular-mocks'], function() {
  describe('Word directive', function() {

    var element;
    var scope;

    beforeEach(module('alexApp'));
    beforeEach(module('views/partials/lessonCreator'));

    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.addLesson = function(lessonId) {};
      spyOn(scope, 'addLesson').andCallThrough();

      element = angular.element('<lessoncreator add="addLesson(lessonId)"/>');
      $compile(element)(scope);
    }));

    it('should be not visible initially', function() {
      //given
      scope.$digest();

      //when
      var actualVisibilityOfForm = element.isolateScope().isFormVisible;

      //then
      expect(actualVisibilityOfForm).toBeFalsy();
    });

    it('should invoke an add method of parent scope', function() {
      //given
      scope.$digest();
      element.isolateScope().isFormVisible = true;
      var lessonToAdd = 'lesson';

      //when
      element.isolateScope().lessonId = lessonToAdd;
      element.isolateScope().addLesson();
      var actualVisibilityOfForm = element.isolateScope().isFormVisible;

      //then
      expect(scope.addLesson).toHaveBeenCalledWith('lesson');
      expect(actualVisibilityOfForm).toBeFalsy();
    });

    it('should should clear lesson input field and hide a form', function() {
      //given
      scope.$digest();
      element.isolateScope().isFormVisible = true;
      element.isolateScope().lessonId = 'lesson';

      //when
      element.isolateScope().abort();

      //then
      expect(element.isolateScope().isFormVisible).toBeFalsy();
      expect(element.isolateScope().lessonId).toBe('');
    });

  });
});
