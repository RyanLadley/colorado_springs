app.controller('accountController', function($scope, $location, $routeParams, postRequestService, monthsService, sortService){
  

    //This block calls the backend to retrieve all transactions belonging to this account, seperated by months
    postRequestService.request('/api/accounts/details/' +$routeParams.accountId).then(function(success){
        $scope.account = success.data.response;
        $scope.accountName = generateAccountName();
        $scope.account.remaining = Number($scope.account.total_budget) - Number($scope.account.expendetures)

        $scope.selectedMonth = d.getMonth()
        $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]

        //This was being fired more than once
        //TODO: Figure out why, and find a more elegant solution to the problem
        if($scope.months.length <13){
            $scope.months.push("Pending")
        }
        calculateTotals()

    })

    //This Block toggles the Get Transfers button
    //If tansfers have not been retrieved from the backend, retrieve them on first click
    //Change button text depending on what is currently being displayed
    $scope.displayTransfers=false;
    $scope.buttonMessage = "View Transfers";
    $scope.getTransfers = function(){
        if(!$scope.transfers){
            postRequestService.request('/api/accounts/transfers/' +$routeParams.accountId).then(function(success){
                $scope.transfers = success.data.response;
            })
        }
         $scope.displayTransfers = !$scope.displayTransfers

         if($scope.displayTransfers){
            $scope.buttonMessage = "View Transactions"
         }
         else{
            $scope.buttonMessage = "View Transfers"
         }
    }

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


    //This block populates and watches the month dropdown menu. 
    //If the user selects a diffrent month, the displayed transactions will reflect the new month
    var d = new Date()
    $scope.months = monthsService.monthList();
    $scope.$watch('selectedMonth', function(){
        if ($scope.transactions){
            $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]

            column = $scope.sortColumn
            $scope.sortColumn = '' // Reset the selected sortColumn so the default is in ascending order
            $scope.sortTransactions(column) // Sort transactions in the previsouly defined fashion
        }
    })

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