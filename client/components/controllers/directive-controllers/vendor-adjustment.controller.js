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
    $scope.$watch('searchId', function(){
        if($scope.searchId){
            postRequestService.request('/api/vendor/basics/' +$scope.searchId).then(function(success){
                $scope.vendor = success.data.response;
                //Convert cost string into a number
                for(var i = 0; i < $scope.vendor.materials.length; i++){
                    $scope.vendor.materials[i].cost = Number($scope.vendor.materials[i].cost)
                }

            }) 
        } 
    })

   
});