require.config({
  baseUrl: '/javascripts',
  paths: {
    'angular': '../libs/angular/angular.min',
    'angular-route': '../libs/angular-route/angular-route.min',
    'angular-animate': '../libs/angular-animate/angular-animate.min',
    '_': '../libs/underscore/underscore'
  },
  shim: {
    'angular': {
      'exports': 'angular'
    },
    '_': {
      'exports': '_'
    },
    'angular-route': {
      dependencies: ['angular']
    },
    'angular-animate': {
      dependencies: ['angular']
    }
  }
});

require(['angular', 'routes/routes'], function(angular) {
  angular.element().ready(function() {
    angular.bootstrap(document, ['alexApp']);
  });
});
