define(['alexApp', 'angular', 'angular-mocks'], function () {
    describe('Words factory', function () {

        var $httpBackend;
        var cut;

        beforeEach(module('alexApp'));

        beforeEach(inject(function (Words, _$httpBackend_) {
            cut = Words;
            $httpBackend = _$httpBackend_;
        }));

        it('should add a new word', function () {
            //given
            var expected = [
                {
                    word: 'word',
                    translation: 'slowo',
                    lessonId: 'lesson',
                    username: 'user',
                    _id: '1'

                }
            ];
            var wordsData = {
                word: 'word',
                translation: 'slowo',
                lessonId: 'lesson',
                username: 'user'
            };

            //when
            $httpBackend.expectPUT('/words', JSON.stringify(wordsData)).respond(expected);
            cut.add(wordsData).then(function (response) {
                //then
                expect(response.data).toEqual(expected);

            });

            $httpBackend.flush();
        });

        it('should remove a word', function () {
            //given
            var wordToBeRemoved = {
                word: 'word',
                translation: 'slowo',
                lessonId: 'lesson',
                username: 'user',
                _id: '1'

            };

            //when
            $httpBackend.expectDELETE('/words/' + wordToBeRemoved._id).respond(200);
            cut.remove(wordToBeRemoved);

            $httpBackend.flush();
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});