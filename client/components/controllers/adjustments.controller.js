app.controller('adjustmentsController', function($scope, $location, postRequestService){
  
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.cityAccounts = success.data.response.city_accounts
    })

    $scope.display = {
    	transactions: true,
    	pending: false,
    	budget:false
    };

});