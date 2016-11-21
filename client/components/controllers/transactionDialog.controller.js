app.controller('transactionDialogController', function($scope, $window, postRequestService){

    $scope.exit = function(){
        $scope.display = false
    }
    $scope.$watch('display', function(){
        if($scope.display){
            postRequestService.request('/api/transaction/details/' +$scope.transactionId).then(function(success){
                $scope.transaction = success.data.response
            })
        }
    })

    $scope.createSingleCoversheet = function(){
        $scope.invoice = {
            invoiceNo: $scope.transaction.invoice_no,
            vendorId: $scope.transaction.vendor_id,
            transactionIds: [$scope.transaction.transaction_id]
        }

        postRequestService.request('/api/coversheet/single', $scope.invoice).then(function(success){
            console.log(success.data.response)
            $window.open("/coversheet/single-invoice/" +success.data.response)
        })

    }
    
});