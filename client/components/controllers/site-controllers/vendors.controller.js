app.controller('vendorsController', function($scope, $rootScope, $location, postRequestService){
  
    $rootScope.loading = true;
    postRequestService.request('/api/vendor/listing').then(function(success){
        $scope.vendors = success.data.response;
        $rootScope.loading = false;
    })

});