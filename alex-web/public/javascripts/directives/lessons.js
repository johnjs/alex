define([], function(){
    return function(Lessons){
        return {
            restrict:'E',
            scope:{
              lesson:'='
            },
            template:'<select ng-model="lesson" ng-options="l as l for l in lessons" ></select>',
            link:function(scope, element, attr){
                Lessons.findLessons().then(function(res){
                    scope.lessons = res.data;
                    scope.lesson = scope.lessons[0];
                });
            }
        };
    };
})