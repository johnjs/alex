define(['_', 'angular', 'angular-mocks', 'alexApp', 'views/partials/words.jade', 'views/partials/lessonCreator.jade'], function(_) {

  var scope;
  var element;
  var Lessons;
  var Words;

  describe("Words directive", function() {

    //given
    var WORDS = [{
      word: 'w1',
      translation: 't1',
      lessonId: 'l1',
      _id: 1
    }, {
      word: 'w2',
      translation: 't2',
      lessonId: 'l2',
      _id: 2
    }];

    var WORD_TO_BE_ADDED = {
      word: 'w3',
      translation: 't3',
      lessonId: 'l3'
    };
    var ID_OF_WORD_TO_BE_ADDED = 3;

    beforeEach(module('alexApp', function($provide) {
      $provide.value('Lessons', {
        findWords: function() {
          return {
            then: function(cbk) {
              var response = {
                data: WORDS
              };
              cbk(response);
            }
          };
        }
      });

      $provide.value('Words', {
        add: function(word) {
          return {
            then: function(cbk) {
              var response = {
                data: [_.extend(word, {
                  _id: ID_OF_WORD_TO_BE_ADDED
                })]
              };
              cbk(response);
            }
          };
        },
        remove: function(word) {
          return {
            then: function(cbk) {
              cbk();
            }
          };
        }
      });
    }));

    beforeEach(module('views/partials/lessonCreator'));
    beforeEach(module('views/partials/words'));

    beforeEach(inject(function($compile, $rootScope, _Lessons_, _Words_) {
      scope = $rootScope.$new();
      scope.lesson = null;

      Lessons = _Lessons_;
      Words = _Words_;

      spyOn(Lessons, 'findWords').andCallThrough();
      spyOn(Words, 'add').andCallThrough();
      spyOn(Words, 'remove').andCallThrough();

      element = angular.element('<words lesson="lesson"/>');
      $compile(element)(scope);
    }));

    it("should refresh words list", function() {
      //given
      scope.lesson = 'currentLesson';
      scope.$digest();

      //then
      element.isolateScope().refreshWords();

      //when
      expect(element.isolateScope().words).toEqual(WORDS);
      expect(Lessons.findWords).toHaveBeenCalledWith(scope.lesson);
      expect(Lessons.findWords.callCount).toBe(2);
    });

    it("should refresh words after each change of current lesson", function() {
      //given
      scope.lesson = 'currentLesson';
      scope.$digest();

      //then
      scope.lesson = 'anotherLesson';
      scope.$digest();

      //when
      expect(element.isolateScope().words).toEqual(WORDS);
      expect(Lessons.findWords).toHaveBeenCalledWith(scope.lesson);
      expect(Lessons.findWords.callCount).toBe(2);
    });

    it("should add a new word", function() {
      //given
      scope.lesson = WORD_TO_BE_ADDED.lessonId;
      scope.$digest();
      element.isolateScope().words = [];
      var expectedWord = _.extend(WORD_TO_BE_ADDED, {
        _id: ID_OF_WORD_TO_BE_ADDED
      });


      //when
      element.isolateScope().add(WORD_TO_BE_ADDED.word, WORD_TO_BE_ADDED.translation);
      scope.$digest();

      //then
      expect(Words.add).toHaveBeenCalledWith(WORD_TO_BE_ADDED);
      expect(Words.add.callCount).toBe(1);
      expect(element.isolateScope().words).toEqual([expectedWord]);
    });

    it("should remove existing word", function() {
      //given
      scope.$digest();
      element.isolateScope().words = WORDS;
      var wordToBeRemoved = WORDS[0];
      var expectedWordsAfterRemoval = [WORDS[1]];

      //when
      element.isolateScope().remove(wordToBeRemoved);

      //then
      expect(Words.remove).toHaveBeenCalledWith(wordToBeRemoved);
      expect(Words.remove.callCount).toBe(1);
      expect(element.isolateScope().words).toEqual(expectedWordsAfterRemoval);

    });

  });
});
