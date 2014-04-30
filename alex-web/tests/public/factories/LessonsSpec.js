define(['alexApp', 'angular', 'angular-mocks'], function () {
    describe('Lessons factory', function () {

        var $httpBackend;
        var cut;

        beforeEach(module('alexApp'));

        beforeEach(inject(function (Lessons, _$httpBackend_) {
            cut = Lessons;
            $httpBackend = _$httpBackend_;
        }));

        it('should find lessons', function () {
            //given
            var expected = [
                'lesson1', 'lesson2'
            ];

            //when
            $httpBackend.expectPOST('/lessons').respond(expected);
            cut.findLessons().then(function (response) {
                //then
                expect(response.data).toEqual(expected);

            });

            $httpBackend.flush();
        });

        it('should find words for a given lesson', function () {
            //given
            var expected = [
                {_id: 'w1'},
                {_id: 'w2'}
            ];
            var lessonId = 'lesson1';
            var requestData = {
                lessonId: lessonId
            };

            //when
            $httpBackend.expectPOST('/words', requestData).respond(expected);
            cut.findWords(lessonId).then(function (response) {
                //then
                expect(response.data).toEqual(expected);
            });

            $httpBackend.flush();
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});