app.directive('dateSelect', function() {
    return{
        restrict: 'E',
        controller: 'dateSelectController',
        scope: {
            date: '=',
            required: '@?',
            inputDisabled: '@?',
            label: '@',
            info: '@?'
        },
        templateUrl: '/res/components/directives/date-select/date-select.template.html'
    };
})