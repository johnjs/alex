define([], function () {
    return function () {
        return {
            restrict: "E",
            scope: {
                add: "&"
            },
            templateUrl: "views/partials/wordCreator"
        };
    };
});