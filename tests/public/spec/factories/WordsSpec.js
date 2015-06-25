define(['alexApp', 'angular', 'angular-mocks'], function() {
  describe('Words factory', function() {

    var $httpBackend;
    var Word;

    beforeEach(module('alexApp'));

    beforeEach(inject(function(_Word_, _$httpBackend_) {
      Word = _Word_;
      $httpBackend = _$httpBackend_;
    }));

    it('should add a new word', function() {
      //given
      var wordsData = {
        word: 'word',
        translation: 'slowo',
        lessonId: 'lesson',
        username: 'user'
      };
      var httpResponse = angular.extend({
        _id: '1'
      }, wordsData);

      var wordToBeAdded = new Word(wordsData);
      var expected = new Word(httpResponse);

      //when
      $httpBackend.expectPUT('/words', JSON.stringify(wordsData)).respond([httpResponse]);
      wordToBeAdded.create().then(function(createdWord) {
        //then
        expect(createdWord).toEqual(expected);
      });

      $httpBackend.flush();
    });

    it('should remove a word', function() {
      //given
      var wordToBeRemoved = {
        word: 'word',
        translation: 'slowo',
        lessonId: 'lesson',
        username: 'user',
        _id: '1'

      };

      var w = new Word(wordToBeRemoved);

      //when
      $httpBackend.expectDELETE('/words/' + wordToBeRemoved._id).respond(200);
      w.remove();

      $httpBackend.flush();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});
