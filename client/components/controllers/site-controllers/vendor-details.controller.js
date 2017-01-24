app.controller('vendorDetailsController', function($scope, $rootScope, $location, $routeParams, postRequestService){
  
    $rootScope.loading = true;
    postRequestService.request('/api/vendor/details/' +$routeParams.vendorId ).then(function(success){
        $scope.vendor = success.data.response;
        $scope.tickets = $scope.vendor.tickets
        $scope.total_expense = 0
        for(var i = 0; i < $scope.vendor.transactions.length; i++){
            $scope.total_expense += Number($scope.vendor.transactions[i].expense)
        }
        $rootScope.loading = false;
    })

    $scope.toggleTransactionDialog = false;
    $scope.displayTransactionDetails = function(transactionId){
        $scope.dialogTransaction = transactionId;
        $scope.toggleTransactionDialog = true;
    }

    $scope.displayTickets = false;
    $scope.buttonMessage = "View Tickets"
    $scope.toggleTable = function(){
        $scope.displayTickets = !$scope.displayTickets

        if($scope.displayTickets){
            $scope.buttonMessage = "View Transactions"
        }
        else{
            $scope.buttonMessage = "View Tickets"
        }
    }

    //The Following Commented out blocks control selecting tickets by account. This was silly. But not silly enough to get rid of.

    /*
    $scope.selected = {}
    $scope.$watch('selected.accountId', function(){
        if($scope.selected.accountId){
            selectTicketsForDisplay($scope.selected.accountId)
        }
    })

    var selectTicketsForDisplay = function(accountId){

        $scope.tickets = []
        $scope.showDistricts = false
        for(var i = 0; i < $scope.vendor.tickets.length; i++){

            if($scope.vendor.tickets[i].account_id == accountId){
                if($scope.vendor.tickets[i].district == "None" || $scope.vendor.tickets[i].district == ""){
                    $scope.vendor.tickets[i].district = ""
                }
                else{
                    $scope.showDistricts = true
                }

                if($scope.vendor.tickets[i].invoice_no == "None" || $scope.vendor.tickets[i].invoice_no == ""){
                    $scope.vendor.tickets[i].invoice_no = ""
                    $scope.pendingTotal += $scope.vendor.tickets[i].cost
                }

                $scope.tickets.push($scope.vendor.tickets[i])
            }
        }
    }*/
});