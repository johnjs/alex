define([], function() {
  return function($http) {

    var Word = function(data) {
      angular.extend(this, data);
    };

    Word.prototype.create = function() {
      var word = this;
      return $http({
        url: '/words',
        data: JSON.stringify(word),
        method: 'PUT'
      }).then(function(response) {
        word._id = _.first(response.data)._id;
        return word;
      });
    };

    Word.prototype.remove = function() {
      var word = this;
      return $http({
        url: '/words/' + word._id,
        data: {},
        method: 'DELETE'
      });
    };

    return Word;
  };
});
