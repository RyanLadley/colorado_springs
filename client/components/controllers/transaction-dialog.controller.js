app.controller('transactionDialogController', function($scope, $window, postRequestService){

    $scope.exit = function(){
        $scope.display = false
    }
    $scope.$watch('display', function(){
        if($scope.display){
            postRequestService.request('/api/transaction/details/' +$scope.transaction_id).then(function(success){
                $scope.transaction = success.data.response
            })
        }
    })

    $scope.createSingleCoversheet = function(){
        $scope.invoice = {
            invoice_no: $scope.transaction.invoice_no,
            vendor_id: $scope.transaction.vendor_id,
            description: $scope.transaction.description,
            transaction_ids: [$scope.transaction.transaction_id]
        }

        postRequestService.request('/api/coversheet/single', $scope.invoice).then(function(success){
            $window.open("/coversheet/single-invoice/" +success.data.response)
        })

    }
    
});