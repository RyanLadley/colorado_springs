app.controller('budgetAdjustmentController', function($scope, $location, postRequestService){
    
    $scope.submitTransfer = function(){
        if($scope.transferForm.$valid){
            postRequestService.request('/api/accounts/transfer', $scope.transfer).then(function(success){
               //$location.url('/') 
            })
        }
    }
});