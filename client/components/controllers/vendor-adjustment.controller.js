app.controller('vendorAdjustmentController', function($scope, postRequestService, monthsService){
    

    //TODO: The sliding is a hot mess held together by bubblegum and duct tape. Lets run a professional operation here and fix it. Eventually
    $scope.searchId = null;


    $scope.$watch('searchId', function(){
        if($scope.searchId){
            postRequestService.request('/api/vendor/details/' +$scope.searchId).then(function(success){
                var tempVendor = success.data.response;

                $scope.vendor ={
                    vendor_id: tempVendor.vendor_id,
                    name: tempVendor.name,
                    contract_no: tempVendor.contract_no,
                    contract_start: tempVendor.contract_start,
                    contract_end: tempVendor.contract_end,
                    point_of_contact: tempVendor.point_of_contact,
                    phone_nSo: tempVendor.phone_no,
                    address: tempVendor.address,
                    city: tempVendor.city,
                    state: tempVendor.state,
                    zip: tempVendor.zip,
                    email: tempVendor.email,
                    website: tempVendor.website
                }
            }) 
        } 
    })

   
});