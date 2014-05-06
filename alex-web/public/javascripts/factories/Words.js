define([], function() {
  return function($http) {
    return {
      remove: function(word) {
        return $http({
          url: '/words/' + word._id,
          data: {},
          method: 'DELETE'
        });
      },

      add: function(word) {
        return $http({
          url: '/words',
          data: JSON.stringify(word),
          method: 'PUT'
        });
      }
    };
  };
});
