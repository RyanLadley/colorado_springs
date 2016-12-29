app.controller('adminController', function($scope, $location,postRequestService){

    //Gets information for all users
    //Currently only used in permisions
	postRequestService.request('/api/admin/user/listing').then(function(success){
        $scope.users = success.data.response;

    })

    //Gets accounts
    postRequestService.request('/api/accounts/budget').then(function(success){
        $scope.accounts = success.data.response;

        convertAccountBudgets()

    })

    var convertAccountBudgets = function(){
        for(var i = 0; i < $scope.accounts.length; i++ ){
            $scope.accounts[i].annual_budget = Number($scope.accounts[i].annual_budget)
            $scope.accounts[i].displayBudget = Number($scope.accounts[i].annual_budget)

            for(var j = 0; j < $scope.accounts[i].sub_accounts.length; j++ ){
                $scope.accounts[i].sub_accounts[j].annual_budget = Number($scope.accounts[i].sub_accounts[j].annual_budget)
                $scope.accounts[i].sub_accounts[j].displayBudget = Number($scope.accounts[i].sub_accounts[j].annual_budget)

                for(var k = 0; k < $scope.accounts[i].sub_accounts[j].sub_accounts.length; k++ ){
                    $scope.accounts[i].sub_accounts[j].sub_accounts[k].annual_budget = Number($scope.accounts[i].sub_accounts[j].sub_accounts[k].annual_budget)
                    $scope.accounts[i].sub_accounts[j].sub_accounts[k].displayBudget = Number($scope.accounts[i].sub_accounts[j].sub_accounts[k].annual_budget)
                }
            }
        }
    }

	$scope.submitNewUser = function(){

		if(!$scope.newUserForm.$valid ){
            $scope.newUserError = "Please fill out all fields"
            return
        }
        if($scope.newUser.password != $scope.confirmedPassword){
			$scope.newUserError = "Passwords do not match"
            return
        }
        if($scope.newUser.password.length < 6){
            $scope.newUserError = "Passwords must be at least 6 characters"
            return
        }

        //Only Executed if above conditions are met 
        postRequestService.request('/api/admin/register', $scope.newUser).then(function(success){
            if(success.data.status == "success"){
                alert("New User Created.")
            }
            else{
                alert("There was an error.")
            }
        })
	}

    //When a users permissions is changed, they are added to this array
	$scope.permissionsToUpdate = []
	$scope.queueChangedPermissions = function(user){
		$scope.permissionsToUpdate.push(user)
	}

    //Send the "permissionsToUpdate array to the back end to update the database"
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

    $scope.submitAccounts = function(){
        postRequestService.request('/api/accounts/update/budget', $scope.accounts).then(function(success){
            if(success.data.status == "success"){
                convertAccountBudgets()
                alert("Accounts have been updated.")
            }
            else{
                alert("There was an error.")
            }
        })
    }
});