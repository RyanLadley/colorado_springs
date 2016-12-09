app.directive('vendorEntry', function() {
    return{
        restrict: 'E',
        controller: 'vendorEntryController',
        scope: {
            vendor: '=',
            materials: '<materialOptions',
            firstpage: '<?',
            page: '=?',
            submit: '='
        },
       templateUrl: '/res/components/directives/vendor-entry/vendor-entry.template.html'
    };
})