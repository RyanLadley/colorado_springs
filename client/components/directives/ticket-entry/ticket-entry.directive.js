app.directive('ticketEntry', function() {
    return{
        restrict: 'E',
        controller: 'ticketEntryController',
        scope: {
            vendors: '<'
        },
       templateUrl: '/res/components/directives/ticket-entry/ticket-entry.template.html'
    };
})