define(['angular', 'angular-mocks', 'alexApp', 'views/partials/lessons.jade', 'views/partials/lessonCreator.jade'], function(angular) {

  var scope;
  var element;

  describe("Lessons directive", function() {
    //given
    var LESSONS;

    beforeEach(module('alexApp'));
    beforeEach(module('views/partials/lessonCreator'));
    beforeEach(module('views/partials/lessons'));

    beforeEach(inject(function($compile, $rootScope, Lesson) {
      //given
      LESSONS = _.map(['l1', 'l2', 'l3'], function(lessonId) {
        return new Lesson(lessonId);
      });
      Lesson.findLessons = function() {
        return {
          then: function(cbk) {
            cbk(LESSONS);
          }
        };
      };

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
      expect(scope.lesson).toBe(_.first(LESSONS));
    });
  });
});
