app.directive('transactionEntry', function() {
    return{
        restrict: 'E',
        controller: 'transactionEntryController',
        scope: {
            transaction: '=',
            vendors: '<vendorOptions',
            accounts: '<accountOptions',
            transactionTypes: '<transactionTypeOptions',
            cityAccounts: '<cityAccountOptions',
            firstpage: '<?',
            page: '=?',
            submit: '='
        },
       templateUrl: '/res/components/directives/transaction-entry/transaction-entry.template.html'
    };
})