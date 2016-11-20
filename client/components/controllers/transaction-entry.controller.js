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
            else if(!$scope.transaction.transactionId || allowDisplay){
                return 'nav-display'
            }
        } 
    }


    $scope.submitTransaction = function(){
        //If the transaction has an Id, we know we are updateing an existing transaction.
        //If it does not, we are creating a new transaction
        if($scope.entryForm.$valid && $scope.remaining >= -0.005 /*rounding error allowance */){
           if($scope.transaction.transactionId){
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

        if(!$scope.transaction.cityAccounts || ($scope.startExpense && $scope.startExpense != $scope.transaction.expense)){
            $scope.remaining = 0
            $scope.startExpense = $scope.transaction.expense
            $scope.transaction.cityAccounts = [{cityAccountId: "", amount: $scope.transaction.expense}]
        }
        else{
            $scope.checkRemaining();
        }
    }

    $scope.checkRemaining = function(){
        var sum = 0

        for(i = 0; i < $scope.transaction.cityAccounts.length; i++){
            sum += $scope.transaction.cityAccounts[i].amount
        }

        $scope.remaining = $scope.transaction.expense - sum;
    }

    $scope.addAccount = function(){
        //Remove Accounts With a value of 0 before adding new accounts
        for(i = 0; i < $scope.transaction.cityAccounts.length; i++){
            if($scope.transaction.cityAccounts[i].amount == 0 && $scope.transaction.cityAccounts[i].cityAccountId ===""){ 
                $scope.transaction.cityAccounts.splice(i,1)
                i--
            }
        }
        if($scope.remaining > 0 && $scope.transaction.cityAccounts.length < 7){
            $scope.transaction.cityAccounts.push({cityAccountId: "", amount: $scope.remaining})
            $scope.checkRemaining();
        }
    }

});