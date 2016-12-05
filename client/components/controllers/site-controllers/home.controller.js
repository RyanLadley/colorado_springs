app.controller('homeController', function($scope, $cookies, $location, $window, postRequestService){

    //Get basic user information like their name and user id
    postRequestService.request('/api/user/basics').then(function(success){
        $scope.user = success.data.response
    })

    //Removes the cookie containing the token, forcing the user to log off
    $scope.logout = function(){
        $cookies.remove('token')
    }

    //TEMPORARY: Creates the excell backup and sends it to the user
    $scope.createBackup = function(){
        postRequestService.request('/api/backup/accounts').then(function(success){
            $window.open("/backups/" +success.data.response)

        })
    }

    //Determines the time of day to guve the user a proper greeting
    $scope.getGreeting = function(){
        var date = new Date()
        hour = date.getHours()

        if(hour < 12){
            return "Morning"
        }
        else if(hour < 17){
            return "Afternoon"
        }
        else{
            return "Evening"
        }
    }
});