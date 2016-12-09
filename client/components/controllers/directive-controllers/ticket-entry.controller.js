app.controller('ticketEntryController', function($scope, $location, postRequestService){


    //When a date is selected, close the calender
    $scope.$watch('vendorId', function(){
        if($scope.vendorId){
            postRequestService.request('/api/vendor/materials/' +$scope.vendorId).then(function(success){
                $scope.materials = success.data.response;
            }) 
        } 
    })
});