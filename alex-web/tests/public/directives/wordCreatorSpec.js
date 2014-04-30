define(['alexApp', 'views/partials/wordCreator.jade', 'angular', 'angular-mocks'], function () {
    describe('Word directive', function () {

        var element;
        var scope;

        beforeEach(module('alexApp'));
        beforeEach(module('views/partials/wordCreator'));

        beforeEach(inject(function ($compile, $rootScope) {
            scope = $rootScope.$new();
            scope.add = function (word, translation) {
            };
            spyOn(scope, 'add').andCallThrough();

            element = angular.element('<wordcreator add="add(word, translation)"></wordcreator>');
            $compile(element)(scope);
        }));

        it('should invoke an add method of parent scope', function () {
            //given
            scope.$digest();

            //when
            element.scope().add('word', 'translation');

            //then
            expect(scope.add).toHaveBeenCalledWith('word', 'translation');
        });

    });
});