define(['_', 'angular', 'angular-mocks', 'alexApp', 'views/partials/words.jade', 'views/partials/lessonCreator.jade'], function(_) {

  var scope;
  var element;
  var Lesson;
  var Word;

  //given
  var WORD_TO_BE_ADDED = {
    word: 'w3',
    translation: 't3',
    lessonId: 'l3'
  };
  var ID_OF_WORD_TO_BE_ADDED = 3;

  var getExistingWords = function() {
    return [
      new Word({
        word: 'w1',
        translation: 't1',
        lessonId: 'l1',
        _id: 1
      }),
      new Word({
        word: 'w2',
        translation: 't2',
        lessonId: 'l2',
        _id: 2
      })
    ];
  };
  var mockServices = function() {
    Lesson.prototype.findWords = function() {
      return {
        then: function(cbk) {
          cbk(getExistingWords());
        }
      };
    };

    Word.prototype.create = function() {
      var word = this;
      return {
        then: function(cbk) {
          cbk(_.extend(word, {
            _id: ID_OF_WORD_TO_BE_ADDED
          }));
        }
      };
    };

    Word.prototype.remove = function() {
      return {
        then: function(cbk) {
          cbk();
        }
      };
    };
  };

  describe("Word directive", function() {

    beforeEach(module('alexApp'));
    beforeEach(module('views/partials/lessonCreator'));
    beforeEach(module('views/partials/words'));

    beforeEach(inject(function($compile, $rootScope, _Lesson_, _Word_) {
      scope = $rootScope.$new();
      scope.lesson = null;

      Lesson = _Lesson_;
      Word = _Word_;

      mockServices();

      spyOn(Word.prototype, 'create').andCallThrough();
      spyOn(Word.prototype, 'remove').andCallThrough();

      element = angular.element('<words lesson="lesson"/>');
      $compile(element)(scope);
    }));

    it("should refresh words list", function() {
      //given
      var expectedWordList = getExistingWords();
      scope.lesson = new Lesson('currentLesson');
      spyOn(scope.lesson, 'findWords').andCallThrough();
      scope.$digest();

      //then
      element.isolateScope().refreshWords();

      //when
      expect(element.isolateScope().words).toEqual(expectedWordList);
      expect(scope.lesson.findWords.callCount).toBe(2);
    });

    it("should refresh words after each change of current lesson", function() {
      //given
      var expectedWordList = getExistingWords();

      var previousLesson = new Lesson('currentLesson');
      spyOn(previousLesson, 'findWords').andCallThrough();

      var nextLesson = new Lesson('anotherLesson');
      spyOn(nextLesson, 'findWords').andCallThrough();

      //when
      scope.lesson = previousLesson;
      scope.$digest();

      //then
      scope.lesson = nextLesson;
      scope.$digest();

      //when
      expect(element.isolateScope().words).toEqual(expectedWordList);
      expect(previousLesson.findWords).toHaveBeenCalled();
      expect(nextLesson.findWords).toHaveBeenCalled();
    });

    it("should add a new word", function() {
      //given
      scope.lesson = new Lesson(WORD_TO_BE_ADDED.lessonId);
      scope.$digest();

      element.isolateScope().words = [];
      var expectedWord = new Word(_.extend(WORD_TO_BE_ADDED, {
        _id: ID_OF_WORD_TO_BE_ADDED
      }));

      //when
      element.isolateScope().add(WORD_TO_BE_ADDED.word, WORD_TO_BE_ADDED.translation);
      scope.$digest();

      //then
      expect(element.isolateScope().words).toEqual([expectedWord]);
    });

    it("should remove existing word", function() {
      //given
      scope.$digest();
      var existingWords = getExistingWords();
      element.isolateScope().words = existingWords;
      var wordToBeRemoved = existingWords[0];
      var expectedWordsAfterRemoval = [existingWords[1]];

      //when
      element.isolateScope().remove(wordToBeRemoved);

      //then
      expect(wordToBeRemoved.remove).toHaveBeenCalled();
      expect(element.isolateScope().words).toEqual(expectedWordsAfterRemoval);
    });

  });
});
