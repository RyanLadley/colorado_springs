app.controller('adjustmentsController', function($scope, $location, postRequestService){
  
    //Request all dropdown menu information from backend
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.cityAccounts = success.data.response.city_accounts
    })

    //$scope.display determines which tab is currently being displayed
    $scope.display = 'transactions'

});