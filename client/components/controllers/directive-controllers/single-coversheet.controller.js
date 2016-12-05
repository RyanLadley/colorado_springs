app.controller('singleCoversheetController', function($scope, $location, $window, postRequestService){

    $scope.search = {
    	invoice_no: null
    }
    $scope.searchInvoice = function(){
        if($scope.search.vendor_id || $scope.search.invoice_no){
            resetSelection()
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
        $scope.invoice.transaction_ids = []
    	for(var i = 0; i < $scope.transactions.length; i++){
			//Add selected transactionsId's to the invoice to be sent to the backend
            if($scope.transactions[i].selected){
                $scope.invoice.transaction_ids.push($scope.transactions[i].transaction_id)
            }
		}

		postRequestService.request('/api/coversheet/single', $scope.invoice).then(function(success){
            $window.open("/coversheet/single-invoice/" +success.data.response)
        })

    }

    $scope.invoice ={
    	invoice_no: null,
    	vendor_id: null
    }

    //TODO: Condense the logic of this function
    $scope.disableCreate = true
    $scope.disableRows = function(transaction){

    	//Transaction was checked
    	if(transaction.selected){
    		$scope.disableCreate = false;
    		//Invoice Number Has not yet been set
    		if(!$scope.invoice.invoice_no){
	    		$scope.invoice.invoice_no = transaction.invoice_no
	    		$scope.invoice.vendor_id = transaction.vendor_id
	    		for(var i = 0; i < $scope.transactions.length; i++){
	    			//Disable rows that do not have matching invoice or vendor
	    			if($scope.transactions[i].invoice_no != $scope.invoice.invoice_no || $scope.transactions[i].vendor_id != $scope.invoice.vendor_id){
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
                resetSelection()
    			for(var i = 0; i < $scope.transactions.length; i++){
	    			//Disable rows that do not have matching invoice or vendor
	    			$scope.transactions[i].disabled =false
	    		}
	    	}
		}
    }

    var resetSelection = function(){
        $scope.invoice.invoice_no = null
        $scope.invoice.vendor_id = null
        $scope.disableCreate = true
    }
});