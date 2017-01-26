app.directive('accountName', function() {
    return{
        restrict: 'E',
        scope: {
            accountId: '<',
            accountNo: '<',
            subNo: '<',
            shredNo: '<'
        },
        template: "<a class = 'account-link' href = '/overview/account/{{accountId}}'>{{accountName}}</a>",
        link:function($scope){
            //Determin Account Name
            $scope.name = ""
            if($scope.shredNo != 'None'){
                $scope.accountName = $scope.accountNo.toString() + "-" +$scope.subNo.toString() +"-" +$scope.shredNo.toString()
            }
            else if($scope.subNo != 'None'){
                $scope.accountName = $scope.accountNo.toString() + "-" +$scope.subNo.toString()
            }
            else{
                $scope.accountName = $scope.accountNo.toString()
            }
        }
        
    };
})
app.directive('accountSelect', function() {
    return{
        restrict: 'E',
        controller: 'accountSelectController',
        scope: {
            accounts: '<?',
            accountId: '='
        },
        templateUrl: '/res/components/directives/account-select/account-select.template.html',
        link: function(scope){
            scope.$watch('accountId', function() {
                scope.refreshDisplay()
            });
        }
    };
})
app.directive('budgetAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'budgetAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/budget-adjustment.template.html'
    };
})
app.directive('pendingAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'pendingAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/pending-adjustment.template.html'
    };
})
app.directive('ticketAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'ticketAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/ticket-adjustment.template.html'
    };
})
app.directive('transactionAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'transactionAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/transaction-adjustment.template.html'
    };
})
app.directive('vendorAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'vendorAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/vendor-adjustment.template.html'
    };
})
app.directive('projectCoversheet', function() {
    return{
        restrict: 'E',
        controller: 'projectCoversheetController',
        scope: {
            pprtaProjects: "<",
            vendors: "<"
        },
        templateUrl: '/res/components/directives/coversheets/project-coversheet.template.html'
    };
})
app.directive('singleCoversheet', function() {
    return{
        restrict: 'E',
        controller: 'singleCoversheetController',
        templateUrl: '/res/components/directives/coversheets/single-coversheet.template.html'
    };
})
app.directive('dateSelect', function() {
    return{
        restrict: 'E',
        controller: 'dateSelectController',
        scope: {
            date: '=',
            required: '@?',
            inputDisabled: '@?',
            label: '@',
            info: '@?'
        },
        templateUrl: '/res/components/directives/date-select/date-select.template.html',
        link: function(scope){
            scope.formatDate = function (date) {
                function pad(n) {
                    return n < 10 ? '0' + n : n;
                }

                return date && date.getFullYear()
                    + '-' + pad(date.getMonth() + 1)
                    + '-' + pad(date.getDate());
            };
        }
    };
})
app.directive('fileUpload', function () {
    return {
        restrict: 'A',
        scope: {
            file: '='
        },

        link: function (scope, element, attrs) {
            var reader = new FileReader();
            reader.onload = function (event) {
                scope.file = event.target.result;
                scope.$apply();
            }

            element.on('change', function() {
                reader.readAsDataURL(element[0].files[0]);
            });
        }
    };
});
app.directive('infoTip', function() {
    return{
        restrict: 'E',
        scope: {
            message: '@'
        },
        template: '<div class = "info"><i class = "fa fa-info-circle"></i><div class = "infotext">{{message}}</div></div>'
    };
})
app.directive('loadingIcon', function() {
    return{
        restrict: 'E',
        templateUrl: '/res/components/directives/loading-icon/loading-icon.template.html'    
    };
})
app.directive('searchField', function() {
    return{
        restrict: 'E',
        scope: {
            label: '@',
            model: "=?",
            function: "=?"
        },
 		templateUrl: '/res/components/directives/search-field/search-field.template.html'    
	};
})
app.directive('sidebarInfo', function() {
    return{
        restrict: 'E',
        //controller: 'sidebarInfoController',
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
app.directive('transactionTable', function() {
    return{
        restrict: 'E',
        controller: 'transactionTableController',
        scope: {
            transactions: '<',
            totalLabel: '@?',
            emptyMessage: '@'
        },
        templateUrl: '/res/components/directives/transaction-table/transaction-table.template.html'
    };
})
app.directive('vendorDialog', function() {
    return{
        restrict: 'E',
        controller: 'vendorDialogController',
        scope: {
            vendor: '=',
            display: '='
        },
        templateUrl: '/res/components/directives/vendor-dialog/vendor-dialog.template.html'
    };
})
app.directive('vendorEntry', function() {
    return{
        restrict: 'E',
        controller: 'vendorEntryController',
        scope: {
            vendor: '=',
            materials: '<materialOptions',
            firstpage: '<?',
            page: '=?',
            submit: '='
        },
       templateUrl: '/res/components/directives/vendor-entry/vendor-entry.template.html'
    };
})