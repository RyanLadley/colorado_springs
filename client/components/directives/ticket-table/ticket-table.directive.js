app.directive('ticketTable', function() {
    return{
        restrict: 'E',
        controller: 'ticketTableController',
        scope: {
            tickets: '<',
            showDistricts: '<?',
            emptyMessage: '@',
            displayTotal: '<?',
            displayPendingTotal: '<?'
        },
        templateUrl: '/res/components/directives/ticket-table/ticket-table.template.html'
    };
})