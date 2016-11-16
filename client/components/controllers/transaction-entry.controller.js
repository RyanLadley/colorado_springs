app.controller('transactionEntryController', function($scope, $location, postRequestService){
	

    $scope.submitTransaction = function(){
        //If the transaction has an Id, we know we are updateing an existing transaction.
        //If it does not, we are creating a new transaction
        if($scope.entryForm.$valid){
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

});