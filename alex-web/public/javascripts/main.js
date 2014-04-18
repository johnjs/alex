require.config({
    baseUrl: '/javascripts',
    paths: {
        'angular': '../libs/angular/angular.min',
        'angular-route': '../libs/angular-route/angular-route.min'
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angular-route': {
            dependencies:['angular']
        }
    }
});

require(['angular', 'routes/routes'], function (angular) {
    console.log("App started");

    angular.element().ready(function() {
        angular.bootstrap(document, ['alexApp']);
    });

});