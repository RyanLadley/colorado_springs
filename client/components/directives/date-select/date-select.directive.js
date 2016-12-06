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
        templateUrl: '/res/components/directives/date-select/date-select.template.html',
        link: function(scope){
            scope.formatDate = function (date) {
                function pad(n) {
                    return n < 10 ? '0' + n : n;
                }

                return date && date.getFullYear()
                    + '-' + pad(date.getMonth() + 1)
                    + '-' + pad(date.getDate());
            };
        }
    };
})