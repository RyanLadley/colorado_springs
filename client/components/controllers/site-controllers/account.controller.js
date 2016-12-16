app.controller('accountController', function($scope, $rootScope, $location, $routeParams, postRequestService, monthsService, accountNameService){
  

    //This block calls the backend to retrieve all transactions belonging to this account, seperated by months
    $rootScope.loading = true;
    postRequestService.request('/api/accounts/details/' +$routeParams.accountId).then(function(success){
        $scope.account = success.data.response;
        $scope.accountName = accountNameService.getName($scope.account) //Get formated account name
        $scope.account.remaining = Number($scope.account.total_budget) - Number($scope.account.expendetures) //Populate Budget Table

         //Default to Current Month
        $scope.selectedMonth = d.getMonth()
        $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]

        //This was being fired more than once
        //TODO: Figure out why, and find a more elegant solution to the problem
        if($scope.months.length <13){
            $scope.months.push("All")
        }
        calculateTotals()
        $rootScope.loading = false;

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


    //This block populates and watches the month dropdown menu. 
    //If the user selects a diffrent month, the displayed transactions will reflect the new month
    var d = new Date()
    $scope.months = monthsService.monthList();
    $scope.$watch('selectedMonth', function(){
        if ($scope.transactions){
            if($scope.selectedMonth < 12){
                $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]
            }
            else{ //View All has been selected
                $scope.transactions = []
                for(var i = 0; i < 12; i++){
                    $scope.transactions = $scope.transactions.concat($scope.account.monthly_summary[i])
                }
            }
        }
    })


    //This block calulates the expense totals for every month retrieved.
    //Called after transations are retrieved from back end
    $scope.monthlyTotals = []
    var calculateTotals = function(){
        all_total = 0 //Should be the same as account expense. 
        for (var i = 0; i < 12 ; i++){
            total = 0
            for(var j = 0; j < $scope.account.monthly_summary[i].length;j++ ){
                total += Number($scope.account.monthly_summary[i][j].expense)
            }
            all_total +=total
            $scope.monthlyTotals.push(total)
        }
        $scope.monthlyTotals.push(all_total)
    }

});