app.controller('accountController', function($scope, $location, $routeParams, postRequestService, monthsService){
  
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

    var generateAccountName = function(){
        if($scope.account.shred_no != "None"){
            return [$scope.account.account_no, $scope.account.sub_no, $scope.account.shred_no].join('-')
        }
        else if($scope.account.sub_no != "None"){
            return [$scope.account.account_no, $scope.account.sub_no].join('-')
        }
        return $scope.account.account_no
    }

    var d = new Date()
    $scope.months = monthsService.monthList();

    $scope.$watch('selectedMonth', function(){
        if ($scope.transactions){
            $scope.transactions = $scope.account.monthly_summary[$scope.selectedMonth]
        }
    })

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
});