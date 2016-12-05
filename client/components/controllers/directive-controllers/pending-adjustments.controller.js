app.controller('pendingAdjustmentController', function($scope, $location, postRequestService){
	
    //TODO: Use css classes the other tabs have to do this properly
    $scope.pendingDisplay = function(){
        $scope.pendingExpand = !$scope.pendingExpand;

        if($scope.pendingExpand){
            $scope.pendingSetPos = {
                "left": "0"
            };

            $scope.pendingSelectPos= {
                "left": "-1700px" //should mack with $tab-width in shared/_tab.scss
            }
        }
        else{
            $scope.pendingSelectPos = {
                "left": "0"
            };

            $scope.pendingSetPos = {
                "left": "1700px" //should mack with $tab-width in shared/_tab.scss
            }
        }
    }

    //When the user selects a new vendor, call the backend and grab all pending transactions for this vendor
    $scope.$watch('vendorId', function(){
        if($scope.vendorId){
            postRequestService.request('/api/transaction/pending/vendor/' +$scope.vendorId).then(function(success){
                $scope.pending = success.data.response;
            }) 
        } 
    })

    //"$scope.pending[$scope.selectedPending]" serves as a refrence
    //initiatlize $scope.selectedPendingTransaction for manipulation and to send back to server
    $scope.selectedPending = -1;
    $scope.setSelectedPendingTransaction = function(){
	    $scope.selectedPendingTransaction = $scope.pending[$scope.selectedPending]
        $scope.selectedPendingTransaction.date_paid = null
        $scope.pending[$scope.selectedPending].expense = Number($scope.pending[$scope.selectedPending].expense)
	}

    $scope.submitPending = function(){
        if($scope.pendingForm.$valid){
            postRequestService.request('/api/transaction/pending/update', $scope.selectedPendingTransaction).then(function(success){
                $location.url('/') 
            }) 
        }
    }
});