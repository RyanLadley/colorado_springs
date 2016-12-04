app.directive('transactionTable', function() {
    return{
        restrict: 'E',
        controller: 'transactionTableController',
        scope: {
            transactions: '<',
            totalLabel: '@?',
            total: '<?',
            emptyMessage: '@'
        },
        templateUrl: '/res/components/directives/transaction-table/transaction-table.template.html'
    };
})