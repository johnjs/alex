define(['angular', 'angular-mocks', 'alexApp', 'views/partials/lessonCreator.jade'], function(angular) {

  var scope;
  var element;

  describe("Lessons directive", function() {

    beforeEach(module('alexApp', function($provide) {
      $provide.value('Lessons', {
        findLessons: function() {
          return {
            then: function(cbk) {
              var response = {
                data: ['l1', 'l2', 'l3']
              };
              cbk(response);
            }
          };
        }
      });
    }));

    beforeEach(module('views/partials/lessonCreator'));

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
      expect(element.find("select").children().length).toBe(3);
      expect(scope.lesson).toBe('l1');
    });
  });
});
