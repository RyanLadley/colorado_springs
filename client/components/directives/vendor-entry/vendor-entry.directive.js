app.directive('vendorEntry', function() {
    return{
        restrict: 'E',
        controller: 'vendorEntryController',
        scope: {
            vendor: '=',
            submit: '='
        },
       templateUrl: '/res/components/directives/vendor-entry/vendor-entry.template.html'
    };
})