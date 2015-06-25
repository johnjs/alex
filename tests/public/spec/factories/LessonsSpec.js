define(['_', 'alexApp', 'angular', 'angular-mocks'], function(_) {
  describe('Lessons factory', function() {

    var $httpBackend;
    var Lesson;
    var Word;

    beforeEach(module('alexApp'));

    beforeEach(inject(function(_Lesson_, _Word_, _$httpBackend_) {
      Lesson = _Lesson_;
      Word = _Word_;
      $httpBackend = _$httpBackend_;
    }));

    it('should find lessons', function() {
      //given
      var httpResponse = [
        'lesson1', 'lesson2'
      ];

      var expected = _.map(httpResponse, function(lessonId) {
        return new Lesson(lessonId);
      });

      //when
      $httpBackend.expectPOST('/lessons').respond(httpResponse);
      Lesson.findLessons().then(function(fetchedLessons) {
        //then
        expect(fetchedLessons).toEqual(expected);

      });

      $httpBackend.flush();
    });

    it('should find words for a given lesson', function() {
      //given
      var httpResponse = [{
        _id: 'w1'
      }, {
        _id: 'w2'
      }];

      var lesson = new Lesson('lesson1');
      var requestData = {
        lessonId: lesson.id
      };
      var expected = _.map(httpResponse, function(wordsData) {
        return new Word(wordsData);
      });

      //when
      $httpBackend.expectPOST('/words', requestData).respond(httpResponse);
      lesson.findWords().then(function(words) {
        //then
        expect(words).toEqual(expected);
      });

      $httpBackend.flush();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});
