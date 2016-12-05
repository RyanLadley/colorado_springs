app.controller('profileController', function($scope, $location, postRequestService){

    postRequestService.request('/api/user/details').then(function(success){
        $scope.user = success.data.response;
    })

    //Called when user presses Submit Password Button
    //All fields must be filled 
    //Confirmation and new passwords must match
    $scope.submitNewPassword = function(){
        if(!$scope.passwordForm.$valid){
            $scope.passwordError = "Please fill out all fields."
            return
        }
        if ($scope.password.new != $scope.confirmPassword){
            $scope.passwordError = "Passwords do not match."
            return
        }
        //Add user ID to password to get sent to the backend 
        $scope.password.id = $scope.user.user_id
        postRequestService.request('/api/user/update/password', $scope.password).then(function(success){
            if(success.data.status == "success"){
                alert("Password successfully updated")
                //Reset all user inputs
                $scope.passwordError = ""
                $scope.password= ""
                $scope.confirmPassword = ""
            }
            else{
                $scope.passwordError = "There was an error processing your change."
            }
        }) 
    }

    $scope.submitBackupFreq = function(){
        postRequestService.request('/api/user/update/freq', $scope.user).then(function(success){
            if(success.data.status == "success"){
                alert("Email Frequency successfully updated")
            }
            else{
                $scope.freqError = "There was an error processing your change."
            }
        })    
    }

    $scope.submitContactInformation = function(){
        if($scope.contactForm.$valid){
            postRequestService.request('/api/user/update/contact', $scope.user).then(function(success){
                if(success.data.status == "success"){
                    alert("Contact information successfully updated")
                    $scope.contactError = ""
                }
                else{
                    $scope.contactError = "There was an error processing your change."
                }
            }) 
        }
        else{
            $scope.contactError = "Please fill out all fields."
        }
    }
});