define([], function(){
   return function(Lessons){
        return {
            restrict:"E",
            scope:{
              lesson:'='
            },
            template:'<div><word word="w" ng-repeat="w in words"></div>',
            link:function(scope, element, attr){
                scope.$watch('lesson', function(){
                    Lessons.findWords(scope.lesson).then(function(res){
                        scope.words = res.data;
                    });
                });
            }
        };
   };
});