app.controller('projectCoversheetController', function($scope, $location, $window, postRequestService){

    //NExt lines are used for user display/navigation
    $scope.page = 1;

    $scope.incrementPage = function(){
        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    $scope.navLocation = function(sectionPage){
        if(sectionPage <  $scope.page){
            return 'nav-left'
        }
        else if(sectionPage >  $scope.page){
            return 'nav-right'
        }
        else{
            return 'nav-display'
        } 
    }
    
    //INitialize empty coversheet
    $scope.coversheet ={
        pprta_account_code_id: null,
        vendor_id: null,
        transactions: []
    }

    //Submit an invoice search only if at least one of the fields has a value
    $scope.searchInvoice = function(){
        if($scope.search.vendor_id || $scope.search.invoice_no || $scope.search.pprta_account_code_id){
            postRequestService.request('/api/transaction/invoice/search', $scope.search).then(function(success){
                $scope.transactions = success.data.response
                if($scope.coversheet.pprta_account_code_id){
                    disableRows()
                    checkSelected()
                }
            })
        }
    }

    //Create the cover sheet and send the results to the user
    $scope.createProjectCoversheet = function(){
        postRequestService.request('/api/coversheet/project', $scope.coversheet).then(function(success){
            $window.open("/coversheet/project/" +success.data.response)
        })

    }


    //The following blocks are what enable and disable the rows in the row selection
    
    //This function is the main evaluator. It determines if the given transaction was 
    //selected of deslected. IF it was just selected, evaluate all other visable rows to ensure
    //That only valid (same pprta code and vendor) are slectable. 
    //Then add the selected transaction to the coversheet transaction array
    //If the transaction was just deselected, make sure that it was not the last row to be deselected
    //If it was, re-enable all rows. 
    $scope.disableCreate = true
    $scope.evaluateRows = function(transaction){

        //Transaction was checked
        if(transaction.selected){
            $scope.disableCreate = false;
            $scope.coversheet.transactions.push(transaction)
            //PPRTA Id Has not yet been set
            if(!$scope.coversheet.pprta_account_code_id){
                $scope.coversheet.pprta_account_code_id = transaction.pprta_account_code_id
                $scope.coversheet.vendor_id = transaction.vendor_id
                disableRows()
            }
        }
        else{
            deselectRow(transaction)
            //See if any other transaction is checked, if not, unlock all other transactions
            if($scope.coversheet.transactions.length <= 0){
                //no transactions in coversheer, enable all transacitons
                resetSelection()
                for(var i = 0; i < $scope.transactions.length; i++){
                    //Disable rows that do not have matching invoice or vendor
                    $scope.transactions[i].disabled =false
                }
            }
        }
    }

    //Disables all rows that do not have the current pprta code and vendor
    var disableRows = function(){
        for(var i = 0; i < $scope.transactions.length; i++){
            //Disable rows that do not have matching invoice or vendor
            if($scope.transactions[i].pprta_account_code_id != $scope.coversheet.pprta_account_code_id || $scope.transactions[i].vendor_id != $scope.coversheet.vendor_id){
                $scope.transactions[i].disabled = true;
            }
        }
    }


    //This is called when we change search cirteria to make sure that items that have been checked, appear checked. 
    var checkSelected = function(){
        for(var i = 0; i < $scope.transactions.length; i++){
            for(var j = 0; j < $scope.coversheet.transactions.length; j++){
                if($scope.transactions[i].transaction_id == $scope.coversheet.transactions[j].transaction_id){
                    $scope.transactions[i].selected = true
                    break;
                }
            }
        }
    }

    //This is called when the "remove" button has been pressed. This removes the provided transaction
    //From the cover sheet transaction sarray and unchecks it. 
    var deselectRow = function(transaction){
        for(var j = 0; j < $scope.coversheet.transactions.length; j++){
            if(transaction.transaction_id == $scope.coversheet.transactions[j].transaction_id){
                $scope.coversheet.transactions.splice(j,1)
                i = $scope.transactions.length
                break;
            }
        }
    }

    //All rows have been enabled, reset the pprta and vend ids
    var resetSelection = function(){
        $scope.coversheet.pprta_account_code_id = null
        $scope.coversheet.vendor_id = null
        $scope.disableCreate = true
    }
});