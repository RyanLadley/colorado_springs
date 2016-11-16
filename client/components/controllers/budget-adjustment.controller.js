app.controller('budgetAdjustmentController', function($scope, $location, postRequestService){

	//$scope.accounts = $scope.$parent.accounts
    
    $scope.submitTransfer = function(){
        if($scope.transferForm.$valid){
            postRequestService.request('/api/accounts/transfer', $scope.transfer).then(function(success){
               $location.url('/') 
            })
        }
    }
});