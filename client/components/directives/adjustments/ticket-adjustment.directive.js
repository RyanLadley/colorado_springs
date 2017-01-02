app.directive('ticketAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'ticketAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/ticket-adjustment.template.html'
    };
})