app.controller('overviewController', function($scope, $rootScope, $location, postRequestService){
  
   $rootScope.loading = true;
    postRequestService.request('/api/accounts/overview').then(function(success){
        $scope.accounts = success.data.response;
        $rootScope.loading = false;
    })

    //Expands all accounts and theirs sub accounts so the user can see the whole table
    $scope.expandAll = function(){
        for(var i = 0; i < $scope.accounts.length; i++){
            $scope.accounts[i].showSubaccount = true;
            for(var j = 0; j < $scope.accounts[i].sub_accounts.length; j++){
                $scope.accounts[i].sub_accounts[j].showSubaccount = true;
            }
        }
    }

    //Collapses the table so only the main accounts are seen
    $scope.collapseAll = function(){
        for(var i = 0; i < $scope.accounts.length; i++){
            $scope.accounts[i].showSubaccount = false;
            for(var j = 0; j < $scope.accounts[i].sub_accounts.length; j++){
                $scope.accounts[i].sub_accounts[j].showSubaccount = false;
            }
        }
    }


});