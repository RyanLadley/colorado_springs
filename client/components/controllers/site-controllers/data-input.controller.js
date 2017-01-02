app.controller('dataInputController', function($scope, $rootScope, $location, postRequestService){
    
    $rootScope.loading = false;
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.cityAccounts = success.data.response.city_accounts
        $scope.pprtaProjects = success.data.response.pprta_projects
        $scope.materials = success.data.response.materials
        $rootScope.loading = false;
    })

    //$scope.display detemines which tab is currently beining displayed
    $scope.display = 'transaction'


});