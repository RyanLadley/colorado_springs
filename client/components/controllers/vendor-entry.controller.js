app.controller('vendorEntryController', function($scope, $location, postRequestService){

    $scope.submitVendor = function(){
        if($scope.vendorEntryForm.$valid){
           if($scope.vendor.vendor_id){
                postRequestService.request('/api/vendor/update', $scope.vendor).then(function(request){
                    $location.url('/')   
                });
            }
            else{
                postRequestService.request('/api/vendor/new', $scope.vendor).then(function(request){
                    $location.url('/')   
                });
            }
        }
    }
});