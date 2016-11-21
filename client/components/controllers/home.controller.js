app.controller('homeController', function($scope, $cookies, $location, postRequestService){

    $scope.logout = function(){
        $cookies.remove('token')
    }

    $scope.getGreeting = function(){
        var date = new Date()
        hour = date.getHours()

        if(hour < 12){
            return "Morning"
        }
        else if(hour < 5){
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