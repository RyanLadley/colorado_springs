app.controller('transactionEntryController', function($scope, $location, postRequestService){
	
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
            //TODO: Think long and hard about if we need to if statements here 
            if(!$scope.transaction){
                return 'nav-display'
            }
            else if(!$scope.transaction.transaction_id || allowDisplay){
                return 'nav-display'
            }
        } 
    }


    $scope.submitTransaction = function(){
        //If the transaction has an Id, we know we are updateing an existing transaction.
        //If it does not, we are creating a new transaction
        if($scope.entryForm.$valid && $scope.remaining >= -0.005 /*rounding error allowance */){
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

    $scope.checkRemaining = function(){
        var sum = 0

        for(i = 0; i < $scope.transaction.city_accounts.length; i++){
            sum += $scope.transaction.city_accounts[i].amount
        }

        $scope.remaining = Number(($scope.transaction.expense - sum).toFixed(2));
    }

    $scope.addAccount = function(){
        //Remove Accounts With a value of 0 before adding new accounts
        for(i = 0; i < $scope.transaction.city_accounts.length; i++){
            if($scope.transaction.city_accounts[i].amount == 0 && $scope.transaction.city_accounts[i].city_account_id ===""){ 
                $scope.transaction.city_accounts.splice(i,1)
                i--
            }
        }
        if($scope.remaining > 0){
            $scope.transaction.city_accounts.push({city_account_id: "", amount: $scope.remaining})
            $scope.checkRemaining();
        }
    }

});