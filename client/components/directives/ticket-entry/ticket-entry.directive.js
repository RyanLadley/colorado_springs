app.directive('ticketEntry', function() {
    return{
        restrict: 'E',
        controller: 'ticketEntryController',
        scope: {
            vendors: '<',
            accounts: '<'
        },
       templateUrl: '/res/components/directives/ticket-entry/ticket-entry.template.html'
    };
})