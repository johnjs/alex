define(['alexApp'], function (app) {

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {
                controller: 'MainCtrl',
                templateUrl: 'views/partials/main'
            }).
            otherwise({
                redirectTo: '/'
            });

    }]);

});