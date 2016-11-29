app.directive('transactionDialog', function() {
    return{
        restrict: 'E',
        controller: 'transactionDialogController',
        scope: {
            transaction_id: '=transaction',
            display: '='
        },
        templateUrl: '/res/components/directives/transaction-dialog/transaction-dialog.template.html'
    };
})