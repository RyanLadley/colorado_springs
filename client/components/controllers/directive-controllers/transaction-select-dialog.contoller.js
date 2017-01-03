app.controller('transactionSelectDialogController', function($scope, $window, postRequestService, sortService){

    //Close the dialog
    $scope.exit = function(){
        $scope.display = false
    }

    //When the dialog is called, set the transaction information from the server
    $scope.$watch('display', function(){
        if($scope.display && $scope.ticket.transaction_id){
            postRequestService.request('/api/transaction/details/' +$scope.ticket.transaction_id).then(function(success){
                $scope.currentTransaction = success.data.response
            })
        }
    })

    $scope.transactions = []
    $scope.search = {}
     $scope.searchInvoice = function(){
        if($scope.search.vendor_id || $scope.search.invoice_no){
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
    //Sort by the given column in ascending order
    //If the column has already been selected to be sorted, 
    //Switch the direction in which we are soring
    $scope.sortColumn = ''
    var ascending = true;
    $scope.sortTransactions = function(column){
        if($scope.sortColumn != column){
            $scope.sortColumn = column
            ascending = true;
        }
        else{
            ascending = !ascending
        }
        $scope.transactions = sortService.sortTransactions($scope.transactions, column, ascending)

    }

    $scope.selectedTransaction = null
    $scope.selectTransaction = function(transaction){
        $scope.selectedTransaction = transaction
    }


    $scope.updateTicketTransaction = function(transaction){
        $scope.ticket.transaction_id = transaction.transaction_id
        $scope.ticket.invoice_no = transaction.invoice_no
        $scope.display = false;
    }

    $scope.deleteTicketTranasction = function(){
        $scope.ticket.transaction_id = null
        $scope.ticket.invoice_no = null
        $scope.display = false;
    }

});