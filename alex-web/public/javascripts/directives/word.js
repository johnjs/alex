define([], function () {
    return function () {
        return {
            restrict: "A",
            scope: {
                word: "=",
                remove: "&"
            },
            replace: true,
            template: '<tr class="word"><td class="col-md-4">{{ word.word }}</td>' +
                '<td class="translation col-md-4">{{ word.translation }}</td>' +
                '<td><span ng-click="remove({word:word})" class="glyphicon glyphicon-remove pointer"/></td></tr>'

        }
    }
})