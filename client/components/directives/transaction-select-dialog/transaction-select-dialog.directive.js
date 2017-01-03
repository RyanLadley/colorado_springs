app.directive('transactionSelectDialog', function() {
    return{
        restrict: 'E',
        controller: 'transactionSelectDialogController',
        scope: {
            ticket: '=?',
            vendors: '<',
            display: '='
        },
       templateUrl: '/res/components/directives/transaction-select-dialog/transaction-select-dialog.template.html'
    };
})