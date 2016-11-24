app.directive('vendorAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'vendorAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/vendor-adjustment.template.html'
    };
})