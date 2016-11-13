app.controller('transactionAdjustmentController', function($scope, $location, postRequestService, monthsService){
	
    $scope.accountId = null;

    $scope.transactionsDisplay = function(){
    	$scope.expand = !$scope.expand;

        if($scope.expand){
            $scope.toPos = {
                "left": "0"
            };

            $scope.fromPos = {
            	"left": "-1700px" //should match with $tab-width in shared/_tab.scss
            }
        }
        else{
			$scope.fromPos = {
                "left": "0"
            };

            $scope.toPos = {
            	"left": "1700px" //should match with $tab-width in shared/_tab.scss
            }
        }
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
        console.log($scope.selectedTransaction)
	}

    postRequestService.request('/api/accounts/numbers').then(function(success){
        $scope.accounts = success.data.response;
    })

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