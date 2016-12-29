app.controller('transactionEntryController', function($scope, $location, postRequestService){
	
    //The next few blocks are for navigation 
    //Since this is a special case within the adjustments screen
    //A few complexities are added
    //If no firstpage is provided, this is in data entry, so it is 1
    if ($scope.firstpage == undefined) {
      $scope.firstpage = 1;

    }
    if($scope.page == undefined) {
        $scope.page = $scope.firstpage;
    }
    $scope.incrementPage = function(){
        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    $scope.navLocation = function(sectionPage, allowDisplay){
        if(sectionPage <  $scope.page){
            return 'nav-left'
        }
        else if(sectionPage >  $scope.page){
            //This allows this page to have a smooth flow in the "Adjustments" page
            if(allowDisplay){ 
                return 'nav-right'
            }
        }
        else{
            //If th page is an "adjustment" do not attach nav-display 
            if(!$scope.transaction || (!$scope.transaction.transaction_id  && !$scope.transaction.tickets) || allowDisplay){
                return 'nav-display'
            }
        } 
    }


    $scope.submitTransaction = function(){
        //If the transaction has an Id, we know we are updateing an existing transaction.
        //If it does not, we are creating a new transaction
        if($scope.entryForm.$valid && ($scope.remaining >= -0.005 /*rounding error allowance */ || $scope.transaction.expense < 0)){
           if($scope.transaction.transaction_id){
                postRequestService.request('/api/transaction/update', $scope.transaction).then(function(success){
                   $location.url('/') 
                })
            }
            else{
                postRequestService.request('/api/transaction/new', $scope.transaction).then(function(success){
                    $location.url('/') 
                })
            }
        }
    }

    $scope.deleteTransaction = function(transactionId){
        if(confirm("Are you sure you want to delete this transaction?")){  
            postRequestService.request('/api/transaction/delete/' +transactionId).then(function(success){
                $location.url('/') 
            })
        }
    }

    //This is called when the user transtions from the basic data entry to the city accoutnts screen
    //If this is the initial move, or if the expense has been changed, it populate the city account the "Unassigned" and 100% of the expense
    $scope.setupCityAccounts = function(){

        if(!$scope.transaction.city_accounts || ($scope.startExpense && $scope.startExpense != $scope.transaction.expense)){
            $scope.remaining = 0
            $scope.startExpense = $scope.transaction.expense
            $scope.transaction.city_accounts = [{city_account_id: "", amount: $scope.transaction.expense}]
        }
        else{
            $scope.checkRemaining();
        }
    }

    //Check the transaction expense to the amount that has been assigned to city accounts
    //This is displayed as Total Remining. 
    $scope.checkRemaining = function(){
        var sum = 0

        for(i = 0; i < $scope.transaction.city_accounts.length; i++){
            sum += $scope.transaction.city_accounts[i].amount
        }

        $scope.remaining = Number(($scope.transaction.expense - sum).toFixed(2));
    }

    //If there is more money to be assigned to city account, this function is called by the add acount button
    //It initializes a new account to unasigned to the remaining amount need to be assigned 
    $scope.addAccount = function(){
        if($scope.remaining > 0){
            $scope.transaction.city_accounts.push({city_account_id: "", amount: $scope.remaining})
            $scope.checkRemaining();
        }
    }

    $scope.removeAccount = function(index){
        $scope.transaction.city_accounts.splice(index, 1)
        $scope.checkRemaining();
    }

});