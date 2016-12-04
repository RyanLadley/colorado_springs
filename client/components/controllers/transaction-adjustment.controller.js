app.controller('transactionAdjustmentController', function($scope, $location, postRequestService, monthsService){
	
    $scope.accountId = null;

    //sThe next few blocks controll the navigation of the tab
    $scope.page = 1;
    $scope.incrementPage = function(){
        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    $scope.navLocation = function(firstSectionPage, lastSectionPage){
        if(lastSectionPage <  $scope.page){
            return 'nav-left'
        }
        else if(firstSectionPage >  $scope.page){
            return 'nav-right'
        }
        else{
            return 'nav-display'
        } 
    }

    //"$scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex]" serves as a refrence
    //initiatlize $scope.selectedTransaction for manipulation and to send back to server
    //Then call the server to get the city-account assignemnts assigned to this tranaction 
    $scope.selectedIndex = -1;
    $scope.setSelectedTransaction = function(){
	    $scope.selectedTransaction = {
                transaction_id:$scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].transaction_id,
                account_id: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].account_id,
	    		vendor_id: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].vendor_id,
	            invoice_date: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].invoice_date,
	            date_paid: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].date_paid,
	            invoice_no: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].invoice_no,
                transaction_type_id: Number($scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].transaction_type_id), 
	            description: $scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].description,
	            expense: Number($scope.account.monthly_summary[$scope.selectedMonth][$scope.selectedIndex].expense)
	    }

        postRequestService.request('/api/transaction/city-account-assignments/' +$scope.selectedTransaction.transaction_id ).then(function(success){
            $scope.selectedTransaction.city_accounts = success.data.response;
            
            //Ammount come in as strings, these need to be floats
            for(var i = 0;  i < $scope.selectedTransaction.city_accounts.length; i++){
                $scope.selectedTransaction.city_accounts[i].amount = parseFloat($scope.selectedTransaction.city_accounts[i].amount)
            }
        })
	}

    //When the user selects a new account, get the transactions associated with the account
    //TODO: consider adding a button so there are no unnesicary searches.
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