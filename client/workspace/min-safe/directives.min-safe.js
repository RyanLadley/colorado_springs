app.directive('pendingAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'pendingAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/pending-adjustment.template.html'
    };
})
app.directive('transactionAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'transactionAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/transaction-adjustment.template.html'
    };
})
app.directive('sidebarInfo', function() {
    return{
        restrict: 'E',
        controller: 'sidebarInfoController',
       templateUrl: '/res/components/directives/sidebar/sidebar-info.template.html'
    };
})
app.directive('sidebar', function() {
    return{
        restrict: 'E',
        controller: 'sidebarController',
        scope: {
            card: '='
        },
       templateUrl: '/res/components/directives/sidebar/sidebar.template.html'
    };
})
app.directive('transactionEntry', function() {
    return{
        restrict: 'E',
        controller: 'transactionEntryController',
        scope: {
            transaction: '=',
            submit: '='
        },
       templateUrl: '/res/components/directives/transaction-entry/transaction-entry.template.html'
    };
})
app.directive('vendorEntry', function() {
    return{
        restrict: 'E',
        controller: 'vendorEntryController',
        scope: {
            vendor: '=',
            submit: '='
        },
       templateUrl: '/res/components/directives/vendor-entry/vendor-entry.template.html'
    };
})