app.controller('loginController', function($scope, $location, postRequestService){
    
    $scope.login = {}
    $scope.submit = function(){
        if(validEmail() && validPassword() ){
            postRequestService.request("/api/admin/login", $scope.login).then(function(request){
                if(request.data.status === "success"){
                    $location.url("/")
                }
                else{
                    $scope.failureMessage = request.data.response;
                }
            });
        }
    }


    var validPassword = function(){
        if(!$scope.login.password || $scope.login.password.length < 6){
            $scope.failureMessage = "Password must be at least 6 characters";
            return false;
        }
        return true;
    }
    
    var validEmail = function(){
        if(!$scope.login.email || !$scope.loginForm.loginEmail.$valid){
            $scope.failureMessage = "The email address provided is invalid";
            return false;
        }
        return true;
    }

});