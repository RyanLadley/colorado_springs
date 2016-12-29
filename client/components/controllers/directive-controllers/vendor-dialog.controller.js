app.controller('vendorDialogController', function($scope, $window, postRequestService){

    //Close the dialog
    $scope.exit = function(){
        $scope.display = false
    }
    
});