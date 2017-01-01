app.controller('expenseController', function($scope, $rootScope,  postRequestService, dateFromString, accountNameService){
    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 500,
            x: function(d){return accountNameService.getName(d);},
            y: function(d){return (Number(d.expendetures) / Number($scope.total)) * 100;},
            showLabels: true,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: true,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            },
            tooltip: {
                valueFormatter: function(d) {
                    return d3.format(",.2f")(d);
                }
            }
        }
    };




    $scope.overviewSelected = true;
    $scope.filter = {
        start_date: "2017-01-01",
        end_date: "2017-12-31"
    }

    $scope.filterReport = function(){
        if(($scope.filter.start_date && $scope.filter.end_date) && (dateFromString.get($scope.filter.start_date) < dateFromString.get($scope.filter.end_date))){
            //Check if a account ID has been provided (subaccount has been selected). If Not, use the account_id if the selected account. Left null if all accounts selected
            if(!$scope.filter.account_id){
                if($scope.selectedAccount){
                    $scope.filter.account_id = $scope.selectedAccount.account_id
                }
            }
            sendRequest()
            $scope.filter.account_id = null
        }
        else{
            alert("Please select a valid start and end date")
        }
    }

    var sendRequest = function(){
        $rootScope.loading = true;
        postRequestService.request('/api/reports/expense', $scope.filter).then(function(success){
            $scope.data = success.data.response.accounts;
            $scope.total = success.data.response.total;
            $rootScope.loading = false;
        })
    }

    sendRequest()

    postRequestService.request('/api/dropdown/accounts').then(function(success){
        $scope.accounts = success.data.response;
    })


    $scope.selectAll = function(){
        if(!$scope.overviewSelected){
            $scope.overviewSelected = true
            $scope.selectedAccount = null
            for(var i = 0; i < $scope.accounts.length; i++){
                $scope.accounts[i].selected = false

                for(var j = 0; j < $scope.accounts[i].sub_accounts.length; j++){
                    $scope.accounts[i].sub_accounts[j].selected = false
                }
            }
        }    
    }


    $scope.selectAccount = function(account){
        if(account.selected){
            $scope.selectAll()
        }
        else{
            $scope.overviewSelected = false
            for(var i = 0; i < $scope.accounts.length; i++){
                $scope.accounts[i].selected = false
            }

            account.selected = true
            $scope.selectedAccount = account

            for(var i = 0; i < $scope.selectedAccount.sub_accounts.length; i++){
                $scope.selectedAccount.sub_accounts[i].selected = false
            }
            $scope.filter.account_id = null
        }
    }

    $scope.selectSubaccount = function(subaccount){
        if(subaccount.selected){
            subaccount.selected = false
        }
        else{
            for(var i = 0; i < $scope.selectedAccount.sub_accounts.length; i++){
                $scope.selectedAccount.sub_accounts[i].selected = false
            }
            subaccount.selected = true  
            $scope.filter.account_id = subaccount.account_id
        }
    }
});