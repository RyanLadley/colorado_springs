app.controller('transactionAdjustmentController', function($scope, $location, postRequestService, monthsService){
	

    //TODO: The sliding is a hot mess held together by bubblegum and duct tape. Lets run a professional operation here and fix it. Eventually
    $scope.accountId = null;

    $scope.page = 1;
    $scope.incrementPage = function(){
        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    //TODO figure out why transactionTypeId needs to be a number and vendorId does not
    $scope.selectedIndex = -1;
    $scope.setSelectedTransaction = function(){
	    $scope.selectedTransaction = {
                transactionId:$scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].transaction_id,
                accountId: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].account_id,
	    		vendorId: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].vendor_id,
	            invoiceDate: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].invoice_date,
	            datePaid: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].date_paid,
	            invoiceNo: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].invoice_no,
                transactionTypeId: Number($scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].transaction_type_id), 
	            description: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].description,
	            expense: Number($scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].expense)
	    }

        postRequestService.request('/api/transaction/city-account-assignments/' +$scope.selectedTransaction.transactionId ).then(function(success){
            var unsanitizedCityAccounts = success.data.response;
            
            if(unsanitizedCityAccounts.length > 0){
                $scope.selectedTransaction.cityAccounts = []
                //Ammount come in as strings, these need to be floats
                for(var i = 0;  i < unsanitizedCityAccounts.length; i++){
                    $scope.selectedTransaction.cityAccounts.push({
                        cityAccountAssignmentId: unsanitizedCityAccounts.city_account_assignment_id,
                        amount: parseFloat(unsanitizedCityAccounts[i].amount),
                        cityAccountId: unsanitizedCityAccounts[i].city_account_id
                    })
                }
            }
        })
	}


    $scope.$watch('accountId', function(){
        if($scope.accountId){
            postRequestService.request('/api/transaction/account/' +$scope.accountId).then(function(success){
                $scope.account = success.data.response;
            }) 
        } 
    })

    var d = new Date()
    $scope.months = monthsService.monthList();
    $scope.selectedMonth = d.getMonth()

    $scope.$watch('selectedMonth', function(){
        if ($scope.transactions){
            $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]
        }
    })

   
});