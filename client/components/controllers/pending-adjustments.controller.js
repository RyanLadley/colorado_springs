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
                transactionId: $scope.pending[$scope.selectedPending].transaction_id,
                accountId: $scope.pending[$scope.selectedPending].account_id,
                vendorId: $scope.pending[$scope.selectedPending].vendor_id,
                invoiceDate: $scope.pending[$scope.selectedPending].invoice_date,
                invoiceNo: $scope.pending[$scope.selectedPending].invoice_no,
                transactionTypeId: Number($scope.pending[$scope.selectedPending].transaction_type_id), 
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