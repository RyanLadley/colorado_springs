app.controller('vendorEntryController', function($scope, $location, postRequestService){

    $scope.submitVendor = function(){
        postRequestService.request('/api/vendor/new', $scope.vendor).then(function(request){
            $location.url('/')   
        });
    }
});