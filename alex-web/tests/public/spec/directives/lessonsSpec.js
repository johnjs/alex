define(['angular', 'angular-mocks', 'alexApp', 'views/partials/lessons.jade', 'views/partials/lessonCreator.jade'], function(angular) {

  var scope;
  var element;

  describe("Lessons directive", function() {
    //given
    var LESSONS = ['l1', 'l2', 'l3'];
    beforeEach(module('alexApp', function($provide) {
      $provide.value('Lessons', {
        findLessons: function() {
          return {
            then: function(cbk) {
              var response = {
                data: LESSONS
              };
              cbk(response);
            }
          };
        }
      });
    }));

    beforeEach(module('views/partials/lessonCreator'));
    beforeEach(module('views/partials/lessons'));

    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      scope.lesson = null;
      element = angular.element('<lessons lesson="lesson"></lessons>');
      $compile(element)(scope);
    }));

    it("should render lessons combo box  and initialize lesson variable", function() {
      //when
      scope.$digest();

      //then
      expect(element.isolateScope().lessons).toBe(LESSONS);
      expect(scope.lesson).toBe('l1');
    });
  });
});
