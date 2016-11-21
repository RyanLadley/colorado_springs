app.controller('transactionDialogController', function($scope, postRequestService){

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
    
});