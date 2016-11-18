app.controller('singleCoversheetController', function($scope, $location, postRequestService){

    $scope.search = {
    	invoiceNo: null
    }
    $scope.searchInvoice = function(){
        if($scope.search.vendorId || $scope.search.invoiceNo){
            postRequestService.request('/api/transaction/invoice/search', $scope.search).then(function(success){
               if(success.data.response.length){
               		$scope.transactions = success.data.response
               }
               else{
               		$scope.transactions = false
               }
            })
        }
    }

    $scope.createSingleCoversheet = function(){
    	$scope.invoiceNo = []
    	for(var i = 0; i < $scope.transactions.length; i++){
			//Add selected transactions accountId's to the invoice to be sent to the backend
			$scope.invoiceNo.append($scope.transactions[i].account_id)
		}
		postRequestService.request('/api/coversheet/single', $scope.invoice).then(function(success){
           console.log("Fired")
        })

}

    $scope.invoice ={
    	invoiceNo: null,
    	vendorName: null
    }

    //TODO: Coondence the functionality of this function
    $scope.disableCreate = true
    $scope.disableRows = function(transaction){

    	//Transaction was checked
    	if(transaction.selected){
    		$scope.disableCreate = false;
    		accountIds.append(transaction.vendor_name)
    		//Invoice Number Has not yet been set
    		if(!$scope.invoice.invoiceNo){
	    		$scope.invoice.invoiceNo = transaction.invoice_no
	    		$scope.invoice.vendorName = transaction.vendor_name
	    		for(var i = 0; i < $scope.transactions.length; i++){
	    			//Disable rows that do not have matching invoice or vendor
	    			if($scope.transactions[i].invoice_no != $scope.invoice.invoiceNo || $scope.transactions[i].vendor_name != $scope.invoice.vendorName){
	    				$scope.transactions[i].disabled = true;
	    			}
	    		}
    		}
    	}
    	else{
    		//See if any other transaction is checked, if not, unlock all other transactions
    		var isSelected = false;
			for(var i = 0; i < $scope.transactions.length; i++){
    			if($scope.transactions[i].selected){
    				isSelected = true;
    				break;
    			}
    		}
    		if(!isSelected){
    			//if is selected is false, enable all transactions
    			$scope.disableCreate = true
    			$scope.invoice.invoiceNo = null
	    		$scope.invoice.vendorName = null
    			for(var i = 0; i < $scope.transactions.length; i++){
	    			//Disable rows that do not have matching invoice or vendor
	    			$scope.transactions[i].disabled =false
	    		}
	    	}
		}
    }
});