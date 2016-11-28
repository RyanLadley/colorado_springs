app.controller('pendingAdjustmentController', function($scope, $location, postRequestService){
	

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

    

    $scope.$watch('vendorId', function(){
        if($scope.vendorId){
            postRequestService.request('/api/transaction/pending/vendor/' +$scope.vendorId).then(function(success){
                $scope.pending = success.data.response;
            }) 
        } 
    })

    $scope.selectedPending = -1;
    $scope.setSelectedPendingTransaction = function(){
	    $scope.selectedTransaction = {
                transaction_id: $scope.pending[$scope.selectedPending].transaction_id,
                account_id: $scope.pending[$scope.selectedPending].account_id,
                vendor_id: $scope.pending[$scope.selectedPending].vendor_id,
                invoice_date: $scope.pending[$scope.selectedPending].invoice_date,
                invoice_no: $scope.pending[$scope.selectedPending].invoice_no,
                transaction_type_id: Number($scope.pending[$scope.selectedPending].transaction_type_id), 
                description: $scope.pending[$scope.selectedPending].description,
                expense: Number($scope.pending[$scope.selectedPending].expense)
	    }
	}

    $scope.submitPending = function(){
        if($scope.pendingForm.$valid){
            postRequestService.request('/api/transaction/pending/update', $scope.selectedTransaction).then(function(success){
                $location.url('/') 
            }) 
        }
    }
});