define([], function() {
  return function($http) {
    return {
      findLessons: function() {
        return $http({
          url: '/lessons',
          data: {},
          method: 'POST'
        });
      },
      findWords: function(lessonId) {
        return $http({
          url: '/words',
          data: {
            lessonId: lessonId
          },
          method: 'POST'
        });
      }
    };
  };
});
