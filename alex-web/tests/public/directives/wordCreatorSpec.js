define(['alexApp', 'views/partials/wordCreator.jade', 'angular', 'angular-mocks'], function () {
    describe('Words creator directive', function () {

        var element;
        var scope;

        beforeEach(module('alexApp'));
        beforeEach(module('views/partials/wordCreator'));

        beforeEach(inject(function ($compile, $rootScope) {
            scope = $rootScope.$new();
            scope.add = function (word, translation) {
                return {
                    then: function (cbk) {
                        cbk();
                    }
                };
            };
            spyOn(scope, 'add').andCallThrough();

            element = angular.element('<wordcreator add="add(word, translation)"></wordcreator>');
            $compile(element)(scope);
        }));

        var ITEM_TO_BE_ADDED = {
            word: 'word',
            translation: 'translation'
        };

        function initScope() {
            scope.$digest();
            element.isolateScope().word = ITEM_TO_BE_ADDED.word;
            element.isolateScope().translation = ITEM_TO_BE_ADDED.translation;
        }

        it('should invoke an add method of parent scope and ', function () {
            //given
            initScope();

            //when
            element.isolateScope().formSubmitAction();

            //then
            expect(scope.add).toHaveBeenCalledWith(ITEM_TO_BE_ADDED.word, ITEM_TO_BE_ADDED.translation);
        });

        it('should clear form inputs after successful adding of a new word', function () {
            //given
            initScope();

            //when
            element.isolateScope().formSubmitAction();

            //then
            expect(element.isolateScope().word).toBe("");
            expect(element.isolateScope().translation).toBe("");
        });

    });
});