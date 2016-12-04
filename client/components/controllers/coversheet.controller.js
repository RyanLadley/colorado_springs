app.controller('coversheetController', function($scope, $location, postRequestService){
  
  	postRequestService.request('/api/dropdown/all').then(function(success){
        $scope.accounts = success.data.response.accounts
        $scope.vendors = success.data.response.vendors
        $scope.transactionTypes = success.data.response.transaction_types
        $scope.pprtaProjects = success.data.response.pprta_projects
    })

    //$scope.display destermines which tab is currently being displayed
    $scope.display = 'single'

});