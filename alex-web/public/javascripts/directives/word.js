define([], function(){
    return function(){
        return {
            restrict: "E",
            scope:{
                word:"="
            },
            template: '<div class="jumbotron container">' +
                '<div class="word col-md-4">{{ word.word }}</div>' +
                '<div class="translation col-md-4">{{ word.translation }}</div>' +
                '<div><i class="glyphicon glyphicon-remove"/></div>'+
                '</div>',
            link:function(scope, element, attr){
                console.log('word!');
            }
        }
    }
})