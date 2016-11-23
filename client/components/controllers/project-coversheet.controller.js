app.controller('projectCoversheetController', function($scope, $location, $window, postRequestService){

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
    
    $scope.coversheet ={
        pprtaAccountCodeId: null,
        vendorId: null,
        transactions: []
    }

    $scope.searchInvoice = function(){
        if($scope.search.vendorId || $scope.search.invoiceNo || $scope.search.pprtaAccountCodeId){
            postRequestService.request('/api/transaction/invoice/search', $scope.search).then(function(success){
                $scope.transactions = success.data.response
                if($scope.coversheet.pprtaAccountCodeId){
                    disableRows()
                    checkSelected()
                }
            })
        }
    }

    $scope.createProjectCoversheet = function(){

        postRequestService.request('/api/coversheet/project', $scope.coversheet).then(function(success){
            $window.open("/coversheet/project/" +success.data.response)
        })

    }

    $scope.disableCreate = true
    $scope.evaluateRows = function(transaction){

        //Transaction was checked
        if(transaction.selected){
            $scope.disableCreate = false;
            $scope.coversheet.transactions.push(transaction)
            //PPRTA Id Has not yet been set
            if(!$scope.coversheet.pprtaAccountCodeId){
                $scope.coversheet.pprtaAccountCodeId = transaction.pprta_account_code_id
                $scope.coversheet.vendorId = transaction.vendor_id
                disableRows()
            }
        }
        else{
            deselectRow()
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

    var disableRows = function(){
        for(var i = 0; i < $scope.transactions.length; i++){
            //Disable rows that do not have matching invoice or vendor
            if($scope.transactions[i].pprta_account_code_id != $scope.coversheet.pprtaAccountCodeId || $scope.transactions[i].vendor_id != $scope.coversheet.vendorId){
                $scope.transactions[i].disabled = true;
            }
        }
    }

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

    var deselectRow = function(){
        for(var i = 0; i < $scope.transactions.length; i++){
            for(var j = 0; j < $scope.coversheet.transactions.length; j++){
                if($scope.transactions[i].transaction_id == $scope.coversheet.transactions[j].transaction_id){
                    $scope.coversheet.transactions.splice(j,1)
                    i = $scope.transactions.length
                    break;
                }
            }
        }
    }

    var resetSelection = function(){
        $scope.coversheet.pprtaAccountCodeId = null
        $scope.coversheet.vendorId = null
        $scope.disableCreate = true
    }
});