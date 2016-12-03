app.controller('adminController', function($scope, $location,postRequestService){

	postRequestService.request('/api/admin/user/listing').then(function(success){
        $scope.users = success.data.response;

    })

	$scope.submitNewUser = function(){
		if($scope.newUserForm.$valid ){
            if($scope.newUser.password == $scope.confirmedPassword){
    			postRequestService.request('/api/admin/register', $scope.newUser).then(function(success){
                    $location.url('/') 
                })
            }
            else{
                $scope.newUserError = "Passwords do not match"
            }
		}
		else{
			$scope.newUserError = "Please fill out all fields"
		}
	}

	$scope.permissionsToUpdate = []
	$scope.queueChangedPermissions = function(user){
		$scope.permissionsToUpdate.push(user)
	}

	$scope.updatePermissions = function(){
		postRequestService.request('/api/admin/user/update/permissions', $scope.permissionsToUpdate).then(function(success){
			if(success.data.status == "success"){
				alert("Permissions have been updated.")
			}
			else{
				alert("There was an error.")
			}
		})
	}
});