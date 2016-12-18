app.controller('adjustmentsController', function($scope, $rootScope, $location, postRequestService){
  
    //Request all dropdown menu information from backend
    $rootScope.loading = true;
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.cityAccounts = success.data.response.city_accounts
        $scope.materials = success.data.response.materials
        $scope.pprtaProjects = success.data.response.pprta_projects
        $rootScope.loading = false;
    })

    //$scope.display determines which tab is currently being displayed
    $scope.display = 'transactions'

    //Since all the tabs share a scope, this makes sure that when a new tab
    //is selected, the first page is displayed
    $scope.resetPage = function(){
        $scope.page = 1;
    }
});