app.controller('devController', function($scope, $location,postRequestService){

    //Gets information for all users
    //Currently only used in permisions
	postRequestService.request('/api/dev/bugs').then(function(success){
        $scope.bugs = success.data.response;

    })

	$scope.submitNewBug = function(){
        //Only Executed if above conditions are met 
        postRequestService.request('/api/dev/new/bug', $scope.newBug).then(function(success){
            if(success.data.status == "success"){
                alert("Bug Added")
            }
            else{
                alert("There was an error.")
            }
        })
	}
});