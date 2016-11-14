app.directive('budgetAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'budgetAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/budget-adjustment.template.html'
    };
})