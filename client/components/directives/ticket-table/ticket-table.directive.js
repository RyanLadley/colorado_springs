app.directive('ticketTable', function() {
    return{
        restrict: 'E',
        controller: 'ticketTableController',
        scope: {
            tickets: '<',
            emptyMessage: '@'
        },
        templateUrl: '/res/components/directives/ticket-table/ticket-table.template.html'
    };
})