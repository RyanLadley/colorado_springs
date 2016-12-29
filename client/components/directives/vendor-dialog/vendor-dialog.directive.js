app.directive('vendorDialog', function() {
    return{
        restrict: 'E',
        controller: 'vendorDialogController',
        scope: {
            vendor: '=',
            display: '='
        },
        templateUrl: '/res/components/directives/vendor-dialog/vendor-dialog.template.html'
    };
})