app.directive('pendingAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'pendingAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/pending-adjustment.template.html'
    };
})