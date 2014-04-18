define(['angular', 'controllers/MainCtrl', 'angular-route'], function(angular, MainCtrl){
    var app = angular.module('alexApp', ['ngRoute']);

    app.controller('MainCtrl', MainCtrl);

    return app;
});