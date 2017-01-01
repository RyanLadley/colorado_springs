app.controller('vendorEntryController', function($scope, $location, postRequestService){

   //The next few blocks are for navigation 
    //Since this is a special case within the adjustments screen
    //A few complexities are added
    //If no firstpage is provided, this is in data entry, so it is 1
    if ($scope.firstpage == undefined) {
      $scope.firstpage = 1;

    }
    if($scope.page == undefined) {
        $scope.page = $scope.firstpage;
    }
    $scope.incrementPage = function(){

        $scope.page++
    }
    $scope.decrementPage = function(){
        $scope.page--
    }

    $scope.navLocation = function(sectionPage, allowDisplay){
        if(sectionPage <  $scope.page){
            return 'nav-left'
        }
        else if(sectionPage >  $scope.page){
            //This allows this page to have a smooth flow in the "Adjustments" page
            if(allowDisplay){ 
                return 'nav-right'
            }
        }
        else{
            //If th page is an "adjustment" do not attach nav-display
            if(!$scope.vendor || !$scope.vendor.vendor_id || allowDisplay){
                return 'nav-display'
            }
        }
    }

    //Add a new element to the vendor.known arrat
    $scope.addKnownMaterial = function(){

        //If the array has not bee initialized yet, initialize
        //If the array has not bee initialized yet, initialize
        if ($scope.vendor == undefined ){
             $scope.vendor= {
                materials: []
            }
        }
        else if($scope.vendor.materials == undefined){
            $scope.vendor.materials = []
        }

        $scope.vendor.materials.push({material: "", cost: 0, unit: "None Selected"})
    }


    //Display the proper units when a known material is selected
    $scope.selectKnownMaterial = function(material_id, index){
        for(var i = 0; i < $scope.materials.length ; i++){
            if( $scope.materials[i].material_id == material_id){
                $scope.vendor.materials[index].unit = $scope.materials[i].unit
            }
        }
    }


    //Remove Eleement from material array
    $scope.removeKnownMaterial = function(index){
        $scope.vendor.materials.splice(index, 1)
    }

    //Add a new element to the vendor.new array
    $scope.addNewMaterial = function(){

        //If the array has not bee initialized yet, initialize
        if ($scope.vendor == undefined ){
             $scope.vendor= {
                new_materials: []
            }
        }
        else if($scope.vendor.new_materials == undefined){
            $scope.vendor.new_materials = []
        }

        $scope.vendor.new_materials.push({name: "", cost: 0, unit: ""})

    }

    //Remove Eleement from new material array
    $scope.removeNewMaterial = function(index){
        $scope.vendor.new_materials.splice(index, 1)
    }
    $scope.submitVendor = function(){
        if($scope.vendorEntryForm.$valid){
           if($scope.vendor.vendor_id){
                postRequestService.request('/api/vendor/update', $scope.vendor).then(function(request){
                    $location.url('/vendors/' +$scope.vendor.vendor_id)   
                });
            }
            else{
                postRequestService.request('/api/vendor/new', $scope.vendor).then(function(request){
                    $location.url('/vendors/' +request.data.response)   
                });
            }
        }
    }
});