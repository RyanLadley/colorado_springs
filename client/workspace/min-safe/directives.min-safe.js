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
app.directive('transactionAdjustment', function() {
    return{
        restrict: 'E',
        controller: 'transactionAdjustmentController',
        templateUrl: '/res/components/directives/adjustments/transaction-adjustment.template.html'
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
        templateUrl: '/res/components/directives/date-select/date-select.template.html'
    };
})
app.directive('imageUpload', function () {
    return {
        restrict: 'A',
        scope: {
            image: '='
        },

        link: function (scope, element, attrs) {
            var reader = new FileReader();
            reader.onload = function (event) {
                scope.image = event.target.result;
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
app.directive('transactionEntry', function() {
    return{
        restrict: 'E',
        controller: 'transactionEntryController',
        scope: {
            transaction: '=',
            vendors: '<vendorOptions',
            accounts: '<accountOptions',
            transactionTypes: '<transactionTypeOptions', 
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