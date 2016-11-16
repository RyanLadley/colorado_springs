app.controller('adminController', function($scope, $location,postRequestService){

	$scope.users = [
		{
			name: "Chuck Chuckers",
			login: "TheChuck",
			email: "chuck@email.com",
			permissions: "2"
		},
		{
			name: "Lama Links",
			login: "TheRealLama",
			email: "Lama@email.com",
			permissions: "1"
		},
		{
			name: "Adminstrator Dan",
			login: "TrueAdmin2000",
			email: "admin@email.com",
			permissions: "0"
		}
	];

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

});