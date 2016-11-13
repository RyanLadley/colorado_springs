app.controller('transactionEntryController', function($scope, $location, postRequestService){
	
    postRequestService.request('/api/accounts/numbers').then(function(success){
        $scope.accounts = success.data.response;
    })

    postRequestService.request('/api/vendor/listing').then(function(success){
        $scope.vendors = success.data.response;
    })

    postRequestService.request('/api/transaction/types').then(function(success){
        $scope.types = success.data.response;
    })

    $scope.submitTransaction = function(){
        //If the transaction has an Id, we know we are updateing an existing transaction.
        //If it does not, we are creating a new transaction
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

});