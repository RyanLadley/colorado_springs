app.controller('vendorAdjustmentController', function($scope, postRequestService, monthsService){

     //sThe next few blocks controll the navigation of the tab
    $scope.page = 1;
    $scope.incrementPage = function(){
        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    $scope.navLocation = function(firstSectionPage, lastSectionPage){
        if(lastSectionPage <  $scope.page){
            return 'nav-left'
        }
        else if(firstSectionPage >  $scope.page){
            return 'nav-right'
        }
        else{
            return 'nav-display'
        } 
    }

    //Search Id is the vendor id that is to be changed    
    $scope.searchId = null;

    //When the user selects a vendor, get the intormation from the server
    //TODO: See if tempVendor is still needed
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
                    phone_no: tempVendor.phone_no,
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