app.controller('transactionTableController', function($scope, postRequestService, sortService){

    //Format the account name given the account number, sub number, and shred out number
    var generateAccountName = function(){
        if($scope.account.shred_no != "None"){
            return [$scope.account.account_no, $scope.account.sub_no, $scope.account.shred_no].join('-')
        }
        else if($scope.account.sub_no != "None"){
            return [$scope.account.account_no, $scope.account.sub_no].join('-')
        }
        return $scope.account.account_no
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
    
    $scope.isSelectedColumn = function(column){
        return column == $scope.sortColumn
    }

    //This block calulates the expense totals for every month retrieved.
    //Called after transations are retrieved from back end
    $scope.monthlyTotals = []
    var calculateTotals = function(){

        for (var i = 0; i < $scope.months.length ; i++){
            total = 0
            for(var j = 0; j < $scope.account.monthly_summary[i].length;j++ ){
                total += Number($scope.account.monthly_summary[i][j].expense)
            }
            $scope.monthlyTotals.push(total)
        }
    }

    //This toggles whether or not the "Transactions Details" dialog will
    //take over the screen. Triggered when a transaction row is clicked .
    $scope.toggleTransactionDialog = false;
    $scope.displayTransactionDetails = function(transactionId){
        $scope.dialogTransaction = transactionId;
        $scope.toggleTransactionDialog = true;
    }
});