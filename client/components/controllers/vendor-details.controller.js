app.controller('vendorDetailsController', function($scope, $location, $routeParams, postRequestService){
  
    postRequestService.request('/api/vendor/details/' +$routeParams.vendorId ).then(function(success){
        $scope.vendor = success.data.response;

        $scope.total_expense = 0
        for(var i = 0; i < $scope.vendor.transactions.length; i++){
            $scope.total_expense += Number($scope.vendor.transactions[i].expense)
        }
    })

    $scope.toggleTransactionDialog = false;
    $scope.displayTransactionDetails = function(transactionId){
        $scope.dialogTransaction = transactionId;
        $scope.toggleTransactionDialog = true;
    }
});