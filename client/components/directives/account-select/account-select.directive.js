app.directive('accountSelect', function() {
    return{
        restrict: 'E',
        controller: 'accountSelectController',
        scope: {
            accountId: '='
        },
        templateUrl: '/res/components/directives/account-select/account-select.template.html',
        link: function(scope){
            scope.$watch('accountId', function() {
                scope.refreshDisplay()
            });
        }
    };
})