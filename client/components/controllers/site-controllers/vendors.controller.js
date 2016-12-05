app.controller('vendorsController', function($scope, $location, postRequestService){
  
    postRequestService.request('/api/vendor/listing').then(function(success){
        $scope.vendors = success.data.response;
    })

});