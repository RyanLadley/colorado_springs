app.controller('homeController', function($scope, $cookies, $location, $window, postRequestService){

    $scope.logout = function(){
        $cookies.remove('token')
    }

    $scope.createBackup = function(){
        postRequestService.request('/api/backup/accounts').then(function(success){
            $window.open("/backups/" +success.data.response)

        })
    }

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

    postRequestService.request('/api/user/basics').then(function(success){
        $scope.user = success.data.response
    })
});