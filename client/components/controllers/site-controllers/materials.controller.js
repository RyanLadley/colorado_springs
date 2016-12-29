app.controller('materialsController', function($scope, $rootScope, postRequestService){
  
   $rootScope.loading = true;
    postRequestService.request('/api/materials/table').then(function(success){
        $scope.materials = success.data.response.table;
        $scope.vendors = success.data.response.vendors;
        console.log($scope.materials)
        $rootScope.loading = false;
    })

});